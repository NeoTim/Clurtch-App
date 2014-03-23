/**
* app.follow Module
*
* Description
*/

angular.module("firebase").factory("angularFireCollectionExtended",["$q","angularFireCollection","$timeout",function($q,angularFireCollection,$timeout)
{
	// Holds all the collections we have called
	var collections = {};

	// An AngularFireCollection Extended
	var Collection = function(url){

		var collection = {
			data: [],
			private: {
				deferred: $q.defer(),
			}
		};

		collection.private.promise = collection.private.deferred.promise;

		// function for waiting for data and then resolving the promise
		var wait_for_data = function()
		{
			// Create a timeout
			$timeout(function()
			{
				// if the collection length is greater then 0
				if(collection.data.length > 0)
				{
					// resolve the promise with the collection
					collection.private.deferred.resolve(collection.data);
				}
				// if the time out hasn't happened yet
				else
				{
					// make a new time out
					wait_for_data();
				}
			});
		};

		// the collection from angular fire
		collection.data = angularFireCollection(url,function(data)
		{
			// on the initial callback, see if there is a value
			if(data.val() === null)
			{
				// if there isn't set the timeout to 0 so that the collection is resolved
				collection.private.deferred.resolve(collection.data);
			}
			else
			{
				wait_for_data();
			}

		});
		// get a collection by an array of ids
		// @param ids array of ids to search for
		collection.data.getByNames = function(ids)
		{
			// obj for the collection to return
			var objs = [];
			// for each object in the collection
			for(var i=0,len = collection.data.length; i<len; i++)
			{
				// if the id is in the array of ids
				if(ids.indexOf(collection.data[i].$id) > -1)
				{
					// push to the objs array to be returned
					objs.push(collection.data[i]);
				}
			}

			// return the objects
			return objs;
		};

		// get an object based on a key
		// @param key string of the key name
		// @param value any value of the key
		collection.data.getByKey  = function(key, value)
		{
			// loop through the collection
			for(var i=0, len=collection.data.length; i<len; i++)
			{
				// if the key value pair match
				if(collection.data[i][key] === value)
				{
					// return the item
					return collection.data[i];
				}
			}

			// return false if nothing was found
			return false;
		};

		// return the collection
		return collection;

	};
	// function to return when calling this method
	// @param URL string for the collection you wish to get
	// @param Timeout int for how long to wait before timing out
	// @return Promise promise
	return function(url, timeout)
	{

		// if the collection doesn't already exist
		if(!collections[url])
		{
			// create the collection
			collections[url] = new Collection(url );
		}

		// if we didn't get a timeout through the params
		if(typeof timeout !== "undefined")
		{
			collections[url].private.timeout = timeout;
		}

		// return the promise
		return collections[url].private.promise;
	};
}]);
