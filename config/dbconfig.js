//file for keeping some required info of server

module.exports = {
    //jwt token (secure data transfer)
    secret: 'yoursecret',
    //my database's URL , note: special characters in password should be encoded with %hex_value
    database: 'mongodb+srv://mannyk778:312004mk@auctionapp.it4tuaa.mongodb.net/?retryWrites=true&w=majority'
}