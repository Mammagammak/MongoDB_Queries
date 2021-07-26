db.getCollection("User").aggregate(

	// Pipeline
	[
		// Stage 1
		{
			$match: {
			    // enter query here
			    //"_id" : { $oid : "60c1c42ae96690d515916091" }
			}
		},

		// Stage 2
		{
			$unwind: {
			    path: "$achievements",
			//    includeArrayIndex: <string>, // optional
			//    preserveNullAndEmptyArrays: <boolean> // optional
			}
		},

		// Stage 3
		{
			$addFields: {
			    // enter query here
			     "metaAchievement_id" : "$achievements._id",
			     "dateOfAchievement" : "$achievements.achievementDate"
			}
		},

		// Stage 4
		{
			$project: {       
			       AchievementDate: {
			      
			      $dateToString : 
			       
			       { format: "%d-%m-%Y", date: "$dateOfAchievement"  } 
			                      },
			        "MetaAchievementId" : "$achievements._id",
			        
			        
			        "AchievementsIdString" :  { $toString : "$achievements._id" },
			        
			      
			                       
			}
		},

		// Stage 5
		{
			$addFields: {
			   // "AchievementDate" : 1, 
			   // "_id":  1,
			   
			   
			     "concat" :  { $concat : [ "$AchievementDate", "$AchievementsIdString"] }
			
			    
			}
		},

		// Stage 6
		{
			$group: {
			    _id: "$concat",
			        
			
			    "count" : { $sum : 1 },
			    "AchievementDate" : { $first : "$AchievementDate"},
			    "MetaAchievementId" : { $first : "$MetaAchievementId"}
			    
			    //<field1>: { <accumulator1> : <expression1> },
			//    userNAme : {$sum : "$_id"}
			    //...
			}
		},

		// Stage 7
		{
			$lookup: // Equality Match
			{
			    from: "MetaAchievement",
			    localField: "MetaAchievementId",
			    foreignField: "_id",
			    as: "MetaAchievements"
			}
			
			// Uncorrelated Subqueries
			// (supported as of MongoDB 3.6)
			// {
			//    from: "<collection to join>",
			//    let: { <var_1>: <expression>, …, <var_n>: <expression> },
			//    pipeline: [ <pipeline to execute on the collection to join> ],
			//    as: "<output array field>"
			// }
		},

		// Stage 8
		{
			$unwind: {
			    path: "$MetaAchievements"
			}
		},

		// Stage 9
		{
			$addFields: {
			    "trigger": "$MetaAchievements.meta.trigger" 
			}
		},
	],

	// Options
	{

	}

	// Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
