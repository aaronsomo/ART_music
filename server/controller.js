const db = require('../Postgres/PGConnection.js');

// const convertBrackets = body => {
//   var properties = ['genres', 'artists', 'groupid', 'likes', 'members', 'bookings', 'potentials'];
//   for (var i = 0; i < properties.length; i++) {
//     if (body[properties[i]]) {
//       body[properties[i]] = JSON.stringify(body[properties[i]]).replace('[', '{').replace(']', '}')
//     }
//   }
//   var numbers = ['groupid', 'likes', 'members', 'bookings', 'potentials']
//   for (var i = 0; i < numbers.length; i++) {
//     if (body[i]) {
//       for (var j = 0; j < body[numbers[j]]; j++) {
//         body[i][numbers[j]] = Number(body[i][numbers[j]])
//       }
//     }
//   }
//   return body
// }

// const convertBrackets = body => {
//   var properties = ['genres', 'artists', 'groupid', 'likes', 'members', 'bookings', 'potentials'];
//   for (var i = 0; i < properties.length; i++) {
//     if (body[properties[i]]) {
//       body[properties[i]] = JSON.stringify(body[properties[i]]).replace('[', '{').replace(']', '}')
//     }
//   }
//   var numbers = ['groupid', 'likes', 'members', 'bookings', 'potentials']
//   for (var i = 0; i < numbers.length; i++) {
//     if (body[i]) {
//       for (var j = 0; j < body[numbers[j]]; j++) {
//         body[i][numbers[j]] = Number(body[i][numbers[j]])
//       }
//     }
//   }
//   return body
// }

const controller = {
  // USERS --------------------------------------------------------

  // GET ------------------------------------->
  getUser: (req, res) => {
    query = `SELECT data from user_profiles where uid='${req.params.uid}'`;
    db.query(query)
      // .then(({data}) => {console.log('I AM ROWS', data)})
      .then(({ rows }) => res.status(200).send(rows[0].data))
      // .then(data => res.status(200).send(data))
      .catch(() => res.status(404).send('GET user was unsuccessful'));
  },

  //INSERT ------------------------------------->
  insertUser: ({ body }, res) => {
    // cBody = convertBrackets(body.data)
    query = `INSERT INTO user_profiles (uid, data) VALUES ('${
      body.uid
    }', '${JSON.stringify(body.data)}')`;
    db.query(query)
      .then(() => res.status(200).send('INSERT user was successful'))
      .catch(() => res.status(404).send('INSERT user was unsuccessful'));
  },

  //DELETE ------------------------------------->
  deleteUser: ({ params }, res) => {
    query = `DELETE FROM user_profiles WHERE id=${params.id}`;
    db.query(query)
      .then(() => res.status(200).send('DELETE user was successful'))
      .catch(() => res.status(404).send('DELETE user was unsuccessful'));
  },

  //UPDATE ------------------------------------->
  updateUser: ({ body, params }, res) => {
    // cBody = convertBrackets(body)
    // groupOrData = body;
    console.log('body inside updateUser: ', body.data);
    // console.log('body inside updateUser: ', body.data);
    console.log('params inside updateUser: ', params);
    if (body.data.group_id) {
      query = `UPDATE user_profiles SET group_id = array_cat(group_id, '{${body.data.group_id}}') where uid='${params.uid}'`;
    }
    if (body.data.data) {
      query = `UPDATE user_profiles SET data='${JSON.stringify(
        body.data.data
      )}' where uid='${params.uid}'`;
    }
    db.query(query)
      .then(() => res.status(200).send('UPDATE user was successful'))
      .catch(() => res.status(404).send('UPDATE user was unsuccessful'));
  },

  // UPSERT ------------------------------------->
  // insertupdateUser: ({body, params}, res) => {
  //   cBody = convertBrackets(body)
  //   query = `INSERT INTO user_profiles (emailaddress, genres, artists, groupid, likes) VALUES ('${cBody.emailaddress}', '${cBody.genres}', '${cBody.artists}', '${cBody.groupid}', '${cBody.likes}') ON CONFLICT where id=${params.id} DO UPDATE SET emailaddress=EXCLUDED.'${cBody.emailaddress}', genres=EXCLUDED.'${cBody.genres}', artists=EXCLUDED.'${cBody.artists}', groupid=EXCLUDED.'${cBody.groupid}', likes=EXCLUDED.'${cBody.likes}'`;
  //   db.query(query)
  //     .then(() => res.status(200).send('UPSERT user was successful'))
  //     .catch(() => res.status(404).send('UPSERT user was unsuccessful'))
  // },

  //GROUPS -------------------------------------------------------->
  insertGroup: ({ body }, res) => {
    console.log(body);
    query = `INSERT INTO groups (data) VALUES ('${JSON.stringify(
      body.data
    )}') RETURNING group_id`;
    db.query(query)
      .then(data => {
        console.log(data);
        res.status(200).send(data.rows[0]);
      })
      .catch(() => res.status(404).send('INSERT group was unsuccessful'));
  },
  deleteGroup: ({ params }, res) => {
    query = `DELETE FROM groups WHERE id=${params.id}`;
    db.query(query)
      .then(() => res.status(200).send('DELETE group was successful'))
      .catch(() => res.status(404).send('DELETE group was unsuccessful'));
  },
  updateGroup: ({ body, params }, res) => {
    // cBody = convertBrackets(body);
    // query = `UPDATE groups SET groupname='${cBody.groupname}', members='${cBody.members}', bookings='${cBody.bookings}', potentials='${cBody.potentials}' WHERE id=${params.id}`;
    console.log(body.data.data);
    console.log(params.id);
    query = `UPDATE groups SET data='${JSON.stringify(
      body.data.data
    )}' WHERE group_id = ${params.id}`;
    db.query(query)
      .then(() => res.status(200).send('UPDATE group was successful'))
      .catch(err => res.status(404).send(err));
  },
  getGroup: ({ body, params }, res) => {
    // cBody = convertBrackets(body);
    console.log('hi', params);
    query = `SELECT data FROM groups WHERE group_id = ${params.id}`;
    db.query(query)
      .then(data => res.status(200).send(data.rows[0]))
      .catch(() => res.status(404).send('unsuccessful GET'));
  }
};

module.exports = controller;

// TESTINGSSSSSSSSSS ----------------------------------------------------------------------------------------------->

// USER ------------------------------------------------------->

// POST
// {
//   "emailaddress": "HIHIIHIHIHIHIH"
// }

// UPDATE
// {
// 	"emailaddress": "asd@gmail.com",
// 	"genres": ["asd", "rap"],
// 	"artists": ["Drake", "ASD"],
// 	"groupid": [1, 2],
// 	"likes": [1, 2, 3, 4]
// }

// GROUP ------------------------------------------------------->

// POST
// {
//   "groupname": "members",
//   "members": [3, 5]
// }

// UPDATE
// {
//   "groupname": "members",
//   "members": [3, 5],
//   "bookings": [1, 2, 3],
//   "potentials": [4, 5, 6]
// }
