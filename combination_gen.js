// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// combination_gen.js
// 
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
// Javascript module to work with combinations.
// Generate (n/k) combinations, iterate and work with them.
// 
// MIT License (MIT)
// Copyright (c) 2011 daniel salvati
//
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
var combination_gen = function() {
  
  // public namespace
  var pub = {}
  

  // Set data, with the Current combination.
  // Array of n elements, with k values true
  // and the rest false.
  //
  // example:
  //
  // a set of k=3 elements from n=6,
  // would be 
  //     [ true, true, true, false, false, false ]
  //
  // For disscussions here, represented as:
  //     [ o o o - - - ]
  //
  pub.set = []
 
 
  // number of elements to choose from.
  // n is the number total of elements to choose from.
  pub. n = 0

  // number of elements that
  // each combination will have.
  pub. k = 0
  

  pub.items = []




  // adds an item to the set of n items
  pub.add = function( item ) {
    pub.items.push( item )
    pub.n = pub.items.length
  }

  

  // draws to console.log a matrix represetations of all 
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
 
 
  // writes to console.log all the items combinations.
  // uses .toString() to output the items as strings.
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









  // creates or recreates the set, and set it to initial position.
  // (the initial position according to the iteration algorithm 
  // used in this class)
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
  // to iterate through all the combinations.
  pub.next = function() {
    var i = who_moves()
    if( i !== false ) {
      move( i )
      return true
    }
    return false
  }
  



  // part of the iteration algorithm.
  // Determines the element to be moved.
  // the element to move is the first
  // from right to left,
  // that has an empty slot at his right.
  // example 1: 
  // set = [ o - - o - ]  o:true  -:false
  // the one to move is the set[3] element
  // example 2: 
  // set = [ - o - o o ]  o:true  -:false
  // the one to move is the set[2] element
  // 
  // returns false is there is no element to move,
  // which should mean that it is the last iteration.
  var who_moves = function() {
    for(var i=pub.n-1; i>0; i--)
      if( pub.set[i-1] && !pub.set[i] ) return i-1
      
    return false
  }





  // move an element one step to the right.
  // then pulls all elements at the right.
  // (part of the iteration algorithm)
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
