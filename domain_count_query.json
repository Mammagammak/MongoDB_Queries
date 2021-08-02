db.getCollection("User").aggregate(

	// Pipeline
	[
		// Stage 1
		{
			$group: {
			    _id: "$email"
			    //<field1>: { <accumulator1> : <expression1> },
			    //...
			}
		},

		// Stage 2
		{
			$project: { 
			   _id : { $split: ["$_id", "@"]}
			}
		},

		// Stage 3
		{
			$addFields: {
			   _id :  { $arrayElemAt: [ "$_id", 1 ] }
			}
		},

		// Stage 4
		{
			$group: {
			    _id: "$_id",
			    totalEmailCount : { $sum : 1 }
			    
			}
		},

		// Stage 5
		{
			$sort: {
			    
			"totalEmailCount" : -1    
			}
		},
	],

	// Options
	{

	}

	// Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
