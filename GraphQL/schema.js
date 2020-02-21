const graphql = require('graphql');
// const _ = require('lodash')
const axios = require('axios');


const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLBoolean
} = graphql;

// const ConcertType = new GraphQLObjectType({
//   name: "Concert",
//   fields: {
//     _embedded: {
//       type: new GraphQLList()
//     }
//   }
// })

// const CompanyType = new GraphQLObjectType({
//   name: "Company",
//   fields: () => ({
//     id: {type: GraphQLString},
//     name: {type: GraphQLString},
//     description: {type: GraphQLString},
//     users: {
//       type: new GraphQLList(UserType),
//       resolve(parentValue, args) {
//         return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
//           .then(res => res.data)
//       }
//     }
//   })
//   // Turns fields value into arrow function variables get executed before function runs to avoid circular.
// });


// const eventType = new GraphQLObjectType({
//   name: 'Event',
//   fields: {
//     events: {
//       type: GraphQLList()
//     }
//   }
// })
// // instruct graphql what type of data we have in here
const socialMediaType = new GraphQLObjectType({
  name: "SocialMedia",
  fields: {
    url: {type: GraphQLString}
  }
})

const externalType = new GraphQLObjectType({
  name: "External",
  fields: {
    youtube: {type: new GraphQLList(socialMediaType)},
    twitter: {type: new GraphQLList(socialMediaType)},
    itunes: {type: new GraphQLList(socialMediaType)},
    facebook: {type: new GraphQLList(socialMediaType)},
    wiki: {type: new GraphQLList(socialMediaType)},
    instagram: {type: new GraphQLList(socialMediaType)},
    homepage: {type: new GraphQLList(socialMediaType)}
  }
})

const attractionType = new GraphQLObjectType({
  name: "Attraction",
  fields: () => ({
    name: {type: GraphQLString},
    type: {type: GraphQLString},
    id: {type: GraphQLString},
    test: {type: GraphQLBoolean},
    url: {type: GraphQLString},
    locale: {type: GraphQLString},
    externalLinks: {type: externalType},
    images: {type: GraphQLList(images1Type)},
    classifications: {type: GraphQLList(classificationType)}
  })
})
const pageType = new GraphQLObjectType({
  name: "Page",
  fields: {
    size:{type: GraphQLInt},
    totalElements: {type: GraphQLInt},
    totalPages: {type: GraphQLInt},
    number: {type: GraphQLInt}
  }
})

const hrefType = new GraphQLObjectType({
  name: "href",
  fields: {
    href: {type: GraphQLString}
  }
});

const linksType = new GraphQLObjectType({
  name: "Links",
  fields: {
    self: {type: hrefType}
  }
});

const upcomingEventsType = new GraphQLObjectType({
  name: "UpcomingEvents",
  fields: {
    _total: {type: GraphQLInt},
    ticketmaster: {type: GraphQLInt}
  }
});

const generalInfoType = new GraphQLObjectType({
  name: "GeneralInfo",
  fields: {
    generalRule: {type: GraphQLString},
    childRule: {type: GraphQLString}
  }
});

const boxOfficeInfoType = new GraphQLObjectType({
  name: "BoxOffice",
  fields: {
    openHoursDetail: {type: GraphQLString},
    acceptedPaymentDetail: {type: GraphQLString},
    willCallDetail: {type: GraphQLString}
  }
});

const idType = new GraphQLObjectType({
  name: "ID",
  fields: {
    id: {type: GraphQLInt}
  }
});

const marketType = new GraphQLObjectType({
  name: "Markets",
  fields: {
    name: {type: GraphQLString},
    id: {type: GraphQLString}
  }
});

const locationType = new GraphQLObjectType({
  name: "Location",
  fields: {
    longitude: {type: GraphQLString},
    latitude: {type: GraphQLString}
  }
});

const addressType = new GraphQLObjectType({
  name: "Address",
  fields: {
    line1: {type: GraphQLString}
  }
});

const countryType = new GraphQLObjectType({
  name: "Country",
  fields: {
    name: {type: GraphQLString},
    countryCode: {type: GraphQLString}
  }
});

const stateType = new GraphQLObjectType({
  name: "State",
  fields: {
    name: {type: GraphQLString},
    stateCode: {type: GraphQLString}
  }
});

const cityType = new GraphQLObjectType({
  name: "City",
  fields: {
    name: {type: GraphQLString}
  }
});

const images1Type = new GraphQLObjectType({
  name: "Images1",
  fields: {
    ratio: {type: GraphQLString},
    url: {type: GraphQLString},
    width: {type: GraphQLInt},
    height: {type: GraphQLInt},
    fallback: {type: GraphQLBoolean}
  }
});

const venuesType = new GraphQLObjectType({
  name: "Venues",
  fields: {
    name: {type: GraphQLString},
    type: {type: GraphQLString},
    id: {type: GraphQLString},
    test: {type: GraphQLBoolean},
    url: {type: GraphQLString},
    locale: {type: GraphQLString},
    images: {type: new GraphQLList(images1Type)},
    postalCode: {type: GraphQLString},
    timezone: {type: GraphQLString},
    city: {type: cityType},
    state: {type: stateType},
    country: {type: countryType},
    address: {type: addressType},
    location: {type: locationType},
    markets: {type: new GraphQLList(marketType)},
    dmas: {type: new GraphQLList(idType)},
    boxOfficeInfo: {type : boxOfficeInfoType},
    parkingDetail: {type: GraphQLString},
    accessibleSeatingDetail: {type: GraphQLString},
    generalInfo: {type: generalInfoType},
    upcomingEvents: {type: upcomingEventsType},
    _links: {type: linksType}
  }
})

const embeddedType = new GraphQLObjectType({
  name: "Embedded",
  fields: {
    venues: {type: new GraphQLList(venuesType)},
    attractions: {type: new GraphQLList(attractionType)}
  }
})

const selfType = new GraphQLObjectType({
  name: "Self",
  fields: {
    href: {type: GraphQLString}
  }
})
const linksType1 = new GraphQLObjectType({
  name: "Links1",
  fields: {
    self: {type: selfType},
    venues: {type: new GraphQLList(selfType)}
  }
})

const ticketLimitType = new GraphQLObjectType({
  name: "TicketLimit",
  fields: {
    info: {type: GraphQLString}
  }
})

const seatmapType = new GraphQLObjectType({
  name: "SeatMap",
  fields: {
    staticUrl: {type: GraphQLString}
  }
})
const productType = new GraphQLObjectType({
  name: "Product",
  fields: {
    id: {type: GraphQLString},
    url: {type: GraphQLString},
    type: {type: GraphQLString},
    name: {type: GraphQLString}
  }
})
const priceType = new GraphQLObjectType({
  name: "Price",
  fields: {
    type: {type: GraphQLString},
    currency: {type: GraphQLString},
    min: {type: GraphQLInt},
    max: {type: GraphQLInt}
  }
})

const promotorType = new GraphQLObjectType({
  name: "Promoter",
  fields: {
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    description: {type: GraphQLString}
  }
})

const subGenreType = new GraphQLObjectType({
  name: "SubGenre",
  fields: {
    id: {type: GraphQLString},
    name: {type: GraphQLString}
  }
})

const classificationType = new GraphQLObjectType({
  name: "Classification",
  fields: {
    primary: {type: GraphQLBoolean},
    segment: {type: subGenreType},
    genre: {type: subGenreType},
    subGenre: {type: subGenreType},
    type: {type: subGenreType},
    subType: {type: subGenreType},
    family: {type: GraphQLString}
  }
})

const statusType = new GraphQLObjectType({
  name: "Status",
  fields: {
    code: {type: GraphQLString}
  }
})
const startType = new GraphQLObjectType({
  name: "Start",
  fields: {
    localDate: {type: GraphQLString},
    localTime: {type: GraphQLString},
    dateTime: {type: GraphQLString},
    dateTBD: {type: GraphQLString},
    dateTBA: {type: GraphQLBoolean},
    timeTBA: {type: GraphQLBoolean},
    noSpecificTime: {type: GraphQLBoolean}
  }
})

const datesType = new GraphQLObjectType({
  name: "Dates",
  fields: {
    start: {type: startType},
    timezone: {type: GraphQLString},
    status: {type: statusType},
    spanMultipleDays: {type: GraphQLBoolean}
  }
})

const publicType = new GraphQLObjectType({
  name: "Public",
  fields: {
    startDateTime: {type: GraphQLString},
    startTBD: {type: GraphQLString},
    endDateTime: {type: GraphQLString}
  }
})

const salesType = new GraphQLObjectType({
  name: "Sales",
  fields: {
    public: {type: publicType}
  }
})

const imagesType = new GraphQLObjectType({
  name: "Images",
  fields: {
    ratio: {type: GraphQLString},
    url: {type: GraphQLString},
    width: {type: GraphQLInt},
    height: {type: GraphQLInt},
    fallback: {type: GraphQLString}
  }
})

const outletType = new GraphQLObjectType({
  name: "Outlet",
  fields: {
    url: {type: GraphQLString},
    type: {type: GraphQLString}
  }
})

const eventType = new GraphQLObjectType({
  name: "Event",
  fields: {
    name: {type: GraphQLString},
    type: {type: GraphQLString},
    id: {type: GraphQLString},
    test: {type: GraphQLString},
    url: {type: GraphQLString},
    local: {type: GraphQLString},
    images: {type: new GraphQLList(imagesType)},
    sales: {type: salesType},
    dates: {type: datesType},
    classifications: {type: new GraphQLList(classificationType)},
    outlets: {type: outletType},
    promotor: {type: promotorType},
    promoters: {type: new GraphQLList(promotorType)},
    info: {type: GraphQLString},
    priceRanges: {type: new GraphQLList(priceType)},
    products: {type: new GraphQLList(productType)},
    seatmap: {type: seatmapType},
    ticketLimit: {type: ticketLimitType},
    _links: {type: linksType1},
    _embedded: {type: embeddedType}
  }
})

const innerType = new GraphQLObjectType({
  name: "Type",
  fields: {
    events: { type: new GraphQLList(eventType) }
  }
})

const concertType = new GraphQLObjectType({
  name: "Concert",
  fields: {
    _embedded: { type: innerType},
    _links: {type: linksType},
    _page:  {type: pageType}
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    searchTicket: {
      type: concertType,
      args: { name: {type: GraphQLString}},
      resolve(parentValue, args) {
        return axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${args.name}&apikey=Y831HAlvhonyzxDxXaWPULurlbBRl0FB
        &countryCode=US`)
          .then(res => (res.data))
      }
    }
  }
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    concert: {
      type: concertType,
      args: {name: {type: GraphQLString}},
      resolve(parentValue, args) {
        return axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${args.name}&apikey=Y831HAlvhonyzxDxXaWPULurlbBRl0FB
        &countryCode=US`)
          .then(res => res.data)
      }
    }
  }
})




module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
})