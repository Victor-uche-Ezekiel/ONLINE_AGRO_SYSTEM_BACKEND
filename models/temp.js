[
    {
      '$match': {
        'product': new ObjectId('6643673541bc30b5f6b327c6')
      }
    }, {
      '$group': {
        '_id': null, 
        'averageRating': {
          '$avg': '$rating'
        }, 
        'numOfReviews': {
          '$sum': 1
        }
      }
    }
  ]