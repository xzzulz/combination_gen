var comb = function() {
  
  var pub = {}
  
  pub.n = 6
  pub.k = 4


  // set of k elements from n
  // implemented as an array of booleans.
  // In the comments, often the set will
  // be represented as an array of o and x.
  // The os represent a true, and the xs represent
  // a false.
  // example:
  // a set of 3 elements from 6,
  // where the first 3 are set and the last 3 are not,
  // would be [ true, true, true, false, false, false ]
  // will be represented as follow:
  // [ o o o x x x ]
  //
  pub.set = []
  


  // create the data structure
  var init = function() {
  
    // array of k elements with 0s
    for(var i=0; i<pub.n; i++)
      pub.set.push( false )

    // initial position, set k 1s
    for(var i=0; i<pub.k; i++)
      pub.set[i] = true   

  }
  

  // 
  pub.list_combinations = function() {
    console.log(pub.set.toString())
    while( next() ) console.log(pub.set.toString())
  }

  
  // move elements
  var next = function() {
    var i = pub.who_moves()
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
  // set = [ o x x o x ]  o:true  x:false
  // the one to move is the set[3] element
  // example 2: 
  // set = [ x o x o o ]  o:true  x:false
  // the one to move is the set[2] element
  // 
  // returns false is there is no element to move
  pub.who_moves = function() {
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
  // if set = [ o x o x o o ]
  // pull_rest(2) would produce
  // [ o x o o o x ]
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



  pub.set.toString = function() {
    var string = '[ '
    for(var i=0; i<pub.set.length; i++ ) {
      if(pub.set[i]) string += 'o '
        else string += 'x '
      
    }
    string += ']'
    return string
  }


  
  init()
  
  return pub
}()


console.log( comb.list_combinations() )
