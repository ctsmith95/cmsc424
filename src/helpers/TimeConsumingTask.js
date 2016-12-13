//This is to test how synchronous querying will affect rendering
export function wasteSomeTime(){
  for(var x = 0; x < 100; x++){
    console.log(x+ '% complete');
    for(var y = 0; y < 1000; y++){
      for(var z = 0; z < 1000; z++){
        var a = x * y * z
      }
    }
  }
}

//Results:
/* Application essentially will freeze during synchronous querying.
Pros: Won't continue on without valid data
Cons: Won't continue at all until function returns
*/
