Problem Statement 

Implement a server which should be capable of doing the following:

   - Exposes a GET API as "api/request?connId=19&timeout=80" 
 This API will keep the request running for provided time on the server side. After the successful completion of the provided time it should return {"status":"ok"}

   - Exposes a GET API as "api/serverStatus" 
 This API returns all the running requests on the server with their time left for completion. E.g {"2":"15","8":"10"} where 2 and 8 are the connIds and 15 and 10 is the time remaining for the requests to complete (in seconds).

   - Exposes a PUT API as "api/kill" with payload as {"connId":12} 
This API will finish the running request with provided connId, so that the finished request returns {"status":"killed"} and the current request will return {"status":"ok"}. If no running request found with the provided connId on the server then the current request should return "status":"invalid connection Id : <connId>"}

You can try running your application with curl for testing. Try to implement the solution which would be efficient and scalable.

use npm install first
have a mongo db installed
have a postman installed
from postman hit the following routes: 
localhost:3000/api/kill {put} 
	payload as req.body 
	{
	"payload": 23
	}

localhost:3000/api/request?connId=23&timeout=8 {get}

localhost:3000/api/serverStatus {get}