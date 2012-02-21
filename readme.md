::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

# combination_gen.js
 
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

 Javascript module to work with combinations.
 Generate (n/k) combinations, iterate and work with them.
 
 Available as a js file, and as a node.js npm package:
 * node.js npm package -> master branch
 * plain .js component -> no_npm branch

 
 MIT License (MIT)
 Copyright (c) 2011 daniel salvati


#### tags

 combinations, javascript, basic combinatorics, set,
 k-combinations,


## Description

 this module can generate all the possible
 combinations of a subset of number k distinct
 elements, from a set of n elements, where the order
 does not matter.
 
 The combinations can be listed for examination, or can 
 be iterated over.

 The total number of possible combination for n and k, 
 is given by:

     / n \    =       n!            for k <= n
     \ k /         k! (n-k)! 


  http://en.wikipedia.org/wiki/Combination


 

 







## Usage

### Installation

#### node.js package

 To install with npm, as a node.js package:  
 With command line, navigate to the folder where will be ibnstalled and enter:
    
    npm install combination_gen
    
 Then In javascript, import with require:

    var combination_gen = require('combination_gen')
   
 
#### plain javascript
    
 To install as a plain javascript file:  
 In github select the no_npm branch, and download with the link there.
 Include the combination_gen.js file in your project.

### Two ways to use

 There are two ways to use this component:


### Basic

   To explore combinations (n/k)
   Specify values for n and k, and explore the combinations.


### With items

   To operate over combinations of items.
   Specify the items in the set, and the size k of the subsets.
   Operate over the combiantions.



 
## Usage description

### Basic


   Specify values for n and k

       combination_gen.n = 6
       combination_gen.k = 4

   Draw to console a matrix of the combinations ( to console.log() )

       combination_gen.draw_matrix()

   This method will iterate for all the combinations, and output
   them, well formated, to console.log




 


### With items


   Add items to the set

       combination_gen.add( 'blue' )
       combination_gen.add( 'orange' )
       combination_gen.add( 'purple' )

   Each item added will adjust the value of n appropiately.


   Specify a value for k

       combination_gen.k = 4


   List all the combinations ( to console.log() )

       combination_gen.list()

   This method will iterate for all the combinations, and output
   them, well formated, to console.log.
   toString() will be called on each item.
   

   Draw to console a matrix of the combinations ( to console.log() )

       combination_gen.draw_matrix()



 


### Work with the combinations


   Other than displaying the combinations for exploring,
   This module also allow to iterate and work over the 
   combinations.

   Add items to the set

       combination_gen.add( 'blue' )
       combination_gen.add( 'orange' )
       combination_gen.add( 'purple' )

   Specify a value for k

       combination_gen.k = 2

   Build the set

       combination_gen.build()

   This will create the set, and set it to an initial value.
   This method should be called after changing n,k or adding 
   items. 
   Methods draw_matrix and list call it before strating to 
   iterate.
   


   Get the current combination as an array of items:

       combination_gen.get_combination()

   Will return an array: 

       [ 'blue', 'orange' ]



   Get the current combination as an array of booleans:

        combination_gen.set

   will return:

       [ true, true, false ]

   where each value correspond to an item, and is true
   if the item is included in the current combination,
   or false if it is not.


   Iterate to the next combination

       combination_gen.next()

   Will return true, if the iteration was successful,
   or false if the current iteration is the last. So it can
   be easily used in loops.


   Return to the first combination with:

       combination_gen.build()

   Will recreate the set, and set it to the initial position,
   Ready for iteration.



## Reference

#### This section content is pending

### combination_gen

### combination_gen properties

    combination_gen.n

    combination_gen.k

    combination_gen.set
        
### combination_gen methods

    combination_gen.add()
    
    combination_gen.build()
    
    combination_gen.next()   
    
    combination_gen.get_combination()   
    
    combination_gen.list()  
    
    combination_gen.draw_matrix()   
    
    
    
    
