// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// combination_gen.js
// 
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// Javascript module to work with combinations.
// Generate (n/k) combinations, iterate and work with them.
//
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// tags
//
// combinations, javascript, basic combinatorics, set,
// k-combinations,
//
//
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// this module can generate all the possible
// combinations of a subset of number k distinct
// elements, from a set of n elements, where the order
// does not matter.
// 
// The combinations can be listed for examination, or can 
// be iterated over.
//
// The total number of possible combination for n and k, 
// is given by:
//
//     / n \  =      n!            for k <= n
//     \ k /      k! (n-k)! 
//
//
// http://en.wikipedia.org/wiki/Combination
//
//
// 
//
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::




// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//
// Usage
//
//
// There are two ways to use this component:
//
//
//   :: The basic way
//
//   To explore combinations (n/k)
//   Specify values for n and k, and explore the combinations
//
//
//   :: With items
//
//   To operate over combinations of items.
//   Specify the items in the set, and the size k of the subsets.
//   Operate over the combiantions.
//
//
//
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//
//   :: 1 The basic way
//
//
//   Specify values for n and k
//
//       combination_gen.n = 6
//       combination_gen.k = 4
//
//   Draw to console a matrix of the combinations ( to console.log() )
//
//       combination_gen.draw_matrix()
//
//   This method will iterate for all the combinations, and output
//   them, well formated, to console.log
//
//
//
//
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//
//   :: 2 With items
//
//
//   Add items to the set
//
//       combination_gen.add( 'blue' )
//       combination_gen.add( 'orange' )
//       combination_gen.add( 'purple' )
//
//   Each item added will adjust the value of n appropiately.
//
//
//   Specify a value for k
//
//       combination_gen.k = 4
//
//
//   List all the combinations ( to console.log() )
//
//       combination_gen.list()
//
//   This method will iterate for all the combinations, and output
//   them, well formated, to console.log.
//   toString() will be called on each item.
//   
//
//   Draw to console a matrix of the combinations ( to console.log() )
//
//       combination_gen.draw_matrix()
//
//
//
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//
//   :: Work with the combinations
//
//
//   Other than displaying the combinations for exploring,
//   This module also allow to iterate and work over the 
//   combinations.
//
//   Add items to the set
//
//       combination_gen.add( 'blue' )
//       combination_gen.add( 'orange' )
//       combination_gen.add( 'purple' )
//
//   Specify a value for k
//
//       combination_gen.k = 2
//
//   Build the set
//
//       combination_gen.build()
//
//   This will create the set, and set it to an initial value.
//   This method should be called after changing n,k or adding 
//   items. 
//   Methods draw_matrix and list call it before strating to 
//   iterate.
//   
//
//
//   Get the current combination as an array of items:
//
//       combination_gen.get_combination()
//
//   Will return an array: 
//
//       [ 'blue', 'orange', 'purple' ]
//
//
//
//   Get the current combination as an array of booleans:
//
//        combination_gen.set
//
//   will return:
//
//       [ true, true, false ]
//
//   where each value correspond to an item, and is true
//   if the item is included in the current combination,
//   or false if it is not.
//
//
//   Iterate to the next combination
//
//       combination_gen.next()
//
//   Will return true, if the iteration was successful,
//   or false if the current iteration is the last. So it can
//   be easily used in loops.
//
//
//   Return to the first combination with:
//
//       combination_gen.build()
//
//   Will recreate the set, and set it to the initial position,
//   Ready for iteration.
//
//
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::






// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// combination_gen.js
// 
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// Javascript module to work with combinations.
// Generate (n/k) combinations, iterate and work with them.
//
var combination_gen = function() {
  
  var pub = {}
  


  // set of k elements from n
  // implemented as an array of booleans.
  // In the comments, often the set will
  // be represented as an array of o and -.
  // The os represent a true, and the -s represent
  // a false.
  // example:
  // a set of 3 elements from 6,
  // where the first 3 are set and the last 3 are not,
  // would be [ true, true, true, false, false, false ]
  // will be represented as follow:
  // [ o o o - - - ]
  //
  pub.set = []
 
 
  // number of elements
  // n is the number total of elements to choose from
  pub. n = 0

  // number of elements from n that
  // each combination will have
  pub. k = 0
  

  pub.items = []


  // adds an item to the set of n items
  pub.add = function( item ) {
    pub.items.push( item )
    pub.n = pub.items.length
  }



  

  // draws a matrix represetations of all 
  // the k-combinations.
  // all the combinations that can be made with k 
  // distinct elements, from the set of n elements.
  pub.draw_matrix = function() {
    
    pub.build()
    
    console.log('\n'
    + '::  combinations matrix  :: \n'
    + 'In this matrix each row is a possible combination.\n'
    + 'Each column is an element of the set of n elements.\n'
    + 'An o means the element is included.\n'
    + 'An - means the element is not included.\n'   
    )
    
    if(pub.n==0) { 
      console.log('[]  0')
      return
    }
    
    var matrix_header = '[ '
    for(var i=0; i<pub.n; i++ ) {
      matrix_header += i
      if(i<10) matrix_header += ' '
    }
    matrix_header += ']'
    console.log(matrix_header)
    
    
    var i = 1
    console.log( format_matrix( pub.set ) + '  ' + i )
    while( pub.next() ) {
      i++
      console.log( format_matrix( pub.set.toString() ) + '  ' + i )
    }
  }



  // returns the current combinations as an array of items
  pub.get_combination = function() {
    
    var comb = []
    
    for( var i=0; i<pub.set.length; i++ ) { 
      if( pub.set[i] ) {
        if( pub.items[i] ) comb.push( pub.items[i] )
          else comb.push( 'o' )
      }
    }    
    
    return comb
  }
 
 

  pub.list = function() {
    
    pub.build()

    console.log('\n'
    + '::  combinations list  :: \n'
    + 'List all possible combinations\n'
    + 'For the values of k and n.\n'   
    )
    
    var i = 1
    console.log( format_list( pub.get_combination() ) + '  ' + i )
    while( pub.next() ) {
      i++
      console.log( format_list( pub.get_combination() ) + '  ' + i )
    }
  }









  // recreates the set, and set it to initial position.
  // the initial position according to the
  // iteration algorithm used in this class.
  pub.build = function() {
    
    if( pub.k>pub.n ) {
      console.log('invalid. pub.k>pub.n')
      return
    }
    
    pub.set = []
    
    // array of k elements with 0s
    for(var i=0; i<pub.n; i++)
      pub.set.push( false )

    // initial position, set k 1s
    for(var i=0; i<pub.k; i++)
      pub.set[i] = true       
    
  }
  
  
  











  
  // changes the set elements to the next
  // possible combination according to
  // a simple algorithm, that allows
  // to iterate through all the combinations
  pub.next = function() {
    var i = who_moves()
    if( i !== false ) {
      move( i )
      return true
    }
    return false
  }
  




  // determine the element to be moved
  // the element to move is the first
  // from right to left
  // that has an empty slot at his right
  // example 1: 
  // set = [ o - - o - ]  o:true  -:false
  // the one to move is the set[3] element
  // example 2: 
  // set = [ - o - o o ]  o:true  -:false
  // the one to move is the set[2] element
  // 
  // returns false is there is no element to move
  var who_moves = function() {
    for(var i=pub.n-1; i>0; i--)
      if( pub.set[i-1] && !pub.set[i] ) return i-1
      
    return false
  }





  // move element
  var move = function(i) {
    pub.set[i] = false
    pub.set[i+1] = true
    // then pull other elements to the right
    // toward the left of the just moved element
    pull_rest(i+1)
  }  


  // this operation is used as part of the algorithm
  // to iterate through all combinations of the finite set.
  //
  // pull elements to the right
  // of i index, toward the left
  // up to i position
  // example:
  // if set = [ o - o - o o ]
  // pull_rest(2) would produce
  // [ o - o o o - ]
  var pull_rest = function(i) {
 
    // there must be at least
    // 2 slots to the right, to pull anything
    if(i>pub.n-3) return false
    
    // step 1
    // count number of trues to the right
    // and clear all trues
    var count = 0
    for( var j=i+1; j<pub.n; j++ ) {
      if( pub.set[j] ) { 
        count ++
        pub.set[j] = false
      }
    }
    
    // step 2
    // set the just counted true values at 
    // their corresponding positions
    for( var j=0; j<count; j++ ) {
      pub.set[j+i+1] = true     
    }    
    
  }






  // format the output, used by the -list()- method
  var format_list = function( list ) {
    var res = '[ '
    for( var i=0; i<list.length; i++ ) { 
      var item = list[i].toString().substring( 0, 9 )
      item = item + '          '.substring( 0, 10-item.length )
      res += item
    }
    res += ']'
    
    return res
  }
  
  

  // used by the -draw_matrix()- method
  var format_matrix = function() {
    var string = '[ '
    for(var i=0; i<pub.set.length; i++ ) {
      if(pub.set[i]) string += 'o '
        else string += '- '
      
    }
    string += ']'
    return string
  }

  
  
  
  
  return pub
}()

//combination_gen.n = 6
//combination_gen.k = 4
//combination_gen.draw_matrix()

combination_gen.add( 'greengreengreen' )
combination_gen.add( 'blue' )
combination_gen.add( 'red' )
combination_gen.add( 'orange' )
combination_gen.add( 'purple' )

combination_gen.k = 3



combination_gen.build()

console.log( combination_gen.set )
console.log( combination_gen.get_combination() )

combination_gen.next()

console.log( combination_gen.set )
console.log( combination_gen.get_combination() )

combination_gen.build()

combination_gen.list()

combination_gen.draw_matrix()
