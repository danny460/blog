# JVM

## Class Loading

### Loading and unloading of class
JVM reading class file into memory, and execute the java program, this is class loading. When JVM remove runtime class data, it is unloading.

### Class Loading
1. Loading
2. Linking
   1. Verification
   2. Preparation
   3. Resolution
3. Initialization

#### Loading

read the binary data from .class file into memory (method area), and create `java.lang.Class` object in the heap. The class object encapsulates and provides access the data structures in method area.

#### Verification

make sure the binary data from .class file is according to the requirements and safe to JVM.

verification includes:
- file format
- metadata 
- bytecode
- symbolic reference 

###
Class initialization is required in the following 
- instantiation, accessing of static variable or calling static method
- reflective access
- when initializing a class and it's parent class is not yet initialized.
- when JVM start, user need to have a main class to execute.
- JDK 1.7, dynamic language support. java.lang.invoke.MethodHandle`


#### Classloader
- Bootstrap classloader
  - c++ implementation
  - part of JVM
  - used by JVM for loading class needed by JVM. It's mainly responsible for loading JDK internal classes, typically rt.jar and other core libraries located in $JAVA_HOME/jre/lib
- Extension classloader
  - java implementation
  - extension class loader is a child of the bootstrap class loader and takes care of loading the extensions of the standard core Java classes. typically under $JAVA_HOME/lib/ext.
- Extension class loader loads from the JDK extensions directory, usually $JAVA_HOME/lib/ext directory or any other directory mentioned in the java.ext.dirs system property.
- System Class Loader
  - takes care of loading all the application level classes into the JVM. It loads files found in the classpath environment variable, -classpath or -cp command line option. 
  - Also, it's a child of Extensions classloader.

`java.lang.ClassLoader.loadClass()` method is responsible for loading the class definition into runtime. 

Delegation Model

If the class isn't already loaded, it delegates the request to the parent class loader. This process happens recursively.

Eventually, if the parent class loader doesn’t find the class, then the child class will call java.net.URLClassLoader.findClass() method to look for classes in the file system itself.

If the last child class loader isn't able to load the class either, it throws java.lang.NoClassDefFoundError or java.lang.ClassNotFoundException.


- loadClass
- defineClass
- 

## References

