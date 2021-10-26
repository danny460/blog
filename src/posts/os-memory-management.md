---
title: Memory Management
path: /operating-system/memory-management
---

# Virtual Memory

page, page fault, address translation, main memory, storage.

Divide virtual memory into fix-sized blocks, called **page**. Each page has $2^p$ bytes. similarly, physical memory are also divided into same-sized blocks, called **page frame**.

virtual page status:

- not allocated: not allocated / created pages. Unallocated pages have no associated data.
- cached: allocated and have associated page frame.
- not cached: not cached in physical memory

## Memory Abstraction

### No Abstraction

First let's answer the questions:

- Why do we need abstraction? What would happen if we have no memory abstraction?

The simplest memory abstraction is no abstraction. The program instruction specifies the physical address directly.

Under this condition, running multiple programs at the same time becomes a challenge. Because the physical memory addresses are used directly, one program can end up overwrite content of another program while executing.

It is still possible to run multiple programs with **swapping**: let the OS copy the entire contents of memory to a disk file and run the next program. IBM 360 provided hardware solution, by using a protective key on memory blocks.

And even if the program can run at the same time, there is one more challenge. The physical addresses in program instructions are constant, but programs can be dynamically loaded and the starting address can be random. This renders the constant physical address useless. One solution is to use **static relocation** -- the program is modified during loading. The constant addresses are modified with offset. However, it's slow and complicated. The loader needs extra information on which addresses need to be modified.

### Address Space

Each and every byte in the address space have a unique address.

#### Base and limit register

### Swapping

#### Memory compaction

merge small holes into bigger chunks of free memory

#### Memory management with bitmaps

#### Memory management with linked list

allocation algorithms

- first fit
- next fit
- best fit
- worst fit
- quick fit: separate lists for common requests

## Virtual Memory

The basic idea behind virtual memory is that each program has its own address space, which is broken up into chunks called pages. Each page is a contiguous range of addresses. These pages are mapped onto physical memory, but not all pages have to be in physical memory at the same time to run the program. When the program references a part of its address space that is in physical memory, the hardware performs the necessary mapping on the fly. When the program references a part of its address space that is not in physical memory, the operating system is alerted to go get the missing piece and re-execute the instruction that failed.

virtual addresses are mapped by a special piece of hardware called the **Memory Management Unit (MMU)**. An MMU maps virtual addresses onto physical memory addresses.

### Paging

The virtual memory address space is divided into fixed-sized ($2^n$ bytes) units called **pages**, the corresponding units in the physical memory are called **page frames**. The page and page frames generally have the same size.

#### Page Table

The Page table stores mapping from virtual pages to page frames. The page table is used by MMU for the address translation. The operating system is responsible for maintaining the page table.

#### Page table entry

- **page frame number**
- **present bit (valid bit)**: access page with this bit set to 0 will cause a page fault.
- **protection bit**: specify what kind of access are permitted. With 3 bits we can show if reading, writing or execution is allowed.
- **modified bit (dirty bit)**: When a page is written to, the modified bit is set. when page is reclaimed, dirty pages must be written back to disk.
- **referenced bit**: set when referenced, no matter read or write
- **caching disabled bit**: important for pages mapped onto device registers (for memory-mapped I/O).

### Speed up paging

There are 2 major performance consideration that the virtual memory design should address

1. Address translation must be fast.
2. If virtual memory space is large, the page table will be large (cost memory).
   - e.g. with 4KB sized pages, a 32-bit address space (4GB) has 1,000,000 pages. If each entry cost 4 bytes, the page table can grow to 4MB. 64-bit address spaces will have much more.

#### Translation Look-aside Buffer (TLB)

TLB is a cache to speed up address translation by avoiding accessing the page table each time. TLB is usually inside the MMU and consists of a small number of entries (rarely more than 256). Each entry consists of information about one page, including virtual page number, page frame number, protection/modified bit, etc.

Note some system does not have dedicated hardware support, instead they use a software TLB approach.

#### Multilevel Page Table

The key idea of multilevel page table is to **avoid keeping all the page tables in memory at all times**. By using multiple smaller tables, only some of the tables need to be in memory.

For example for a 32-bit address space with 2-level page table and 4KB page size, we can divide the 32-bit into `10-bit (PT1) + 10-bit (PT2) + 12-bit (offset 4kb)`.

- The MMU first use `PT1` to lookup the top-level page table and obtain a entry, pointing to a second-level page table representing a 4MB (`10-bit + 12-bit`) address space.
- The MMU then use `PT2` to lookup the second-level page table and find the corresponding entry with the page frame number.
- MMU computes address from page frame number + offset and send the address via bus to memory.

This process shows that although the address contains over a million page, only 2 tables is used (1 top-level + 1 second-level).

#### Address translation

Success translation flow:

1. CPU take the virtual memory address, and pass it to MMU.
2. MMU generate the address of the page table entry, and request the entry from TLB. If TLB miss, try cpu cache/main memory.
3. MMU gets the entry data.
4. MMU construct the physical address from page table entry and virtual address, and request data from cache/main memory.
5. cache/main memory pass the requested data to CPU.

Page fault causing page replacement flow:

1. Same as above
2. Same as above
3. Same as above
4. MMU get the PTE but the valid bit is zero, cause page fault. Trap into kernel for exception handling.
5. Exception handling program find the page frame to replace, if it is modified, write back to disk first.
6. Exception handling program replace the page and update page table entry in memory.
7. Exception handling program return control to original process, retry the instruction that caused page fault. (back to step 1.)

Note: this is simplified and not specific to particular OS.

## Page Replacement Algorithm

| Algorithm                  | Comment                                        |
| -------------------------- | ---------------------------------------------- |
| Optimal                    | Not implementable, but useful as a benchmark   |
| FIFO (First-In, First-Out) | Might throw out important pages                |
| Second chance              | Big improvement over FIFO                      |
| Clock                      | Realistic implementation of FIFO/Second chance |
| LRU (Least Recently Used)  | Excellent, but difficult to implement exactly  |
| NRU (Not Recently Used)    | Very crude approximation of LRU                |
| NFU (Not Frequently Used)  | Fairly crude approximation to LRU              |
| Aging                      | Efficient algorithm that approximates LRU well |
| Working set                | Somewhat expensive to implement                |
| WSClock                    | Good efficient algorithm                       |

## Segmentation

Multiple independent logical address space called **segments**. Different segments may and often will have different lengths. Moreover, segments lengths may change during execution (think of a stack that may grow or shrink). As segments can have different size, replacement can introduce holes in between segments. This is called **checkerboarding** or **external fragmentation**, wasting memory in holes. It can be dealt with **compaction**.

> Note that segments are LOGICAL units, physically could still be implemented with paging. Each segment is linear, but multiple segments together forms a 2-dimensional memory space. To address a memory location, you need to specify the segment number as well as the address within the segment.

### Paging vs Segmentation

| Paging                 | Segmentation                                                                       |
| ---------------------- | ---------------------------------------------------------------------------------- |
| physical               | logical                                                                            |
| 1 linear address space | 2 dimensional address space consists of multiple segments. Each segment is linear. |
| a page is fix-sized    | segment size is variable                                                           |

### Segmentation with paging: MULTICS

Each address consists of the segment number and the address within the segment. The address within the segment is further divided into a page number and a word within the page. Each segment has its own page table. Every segment number associates with a segment descriptor. The segment descriptor contains the main memory address of the page table, segment length, and other bits.

A memory reference works like below:

1. The segment number was used to find the segment descriptor.
2. A check was made to see if the segment’s page table was in memory. If it was, it was located. If it was not, a segment fault occurred. If there was a protection violation, a fault (trap) occurred.
3. The page table entry for the requested virtual page was examined. If the page itself was not in memory, a page fault was triggered. If it was in memory, the main-memory address of the start of the page was extracted from the page table entry.
4. The offset was added to the page origin to give the main memory address where the word was located.
5. The read or store finally took place.

### Segmentation with paging: x86

Up until the x86-64, the virtual memory system of the x86 resembled that of MULTICS in many ways, including the presence of both segmentation and paging.

> The x86-64 architecture does not use segmentation in long mode (64-bit mode). It relies only on paging.
