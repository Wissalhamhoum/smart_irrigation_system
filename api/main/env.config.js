
module.exports = {
    'app endpoint': "smartirrigationsystem.me",
    //'key-file' : 'C:/Users/Wissal HAMHOUM/example.lcom+4-key.pem',
    //'cert-file': 'C:/Users/Wissal HAMHOUM/example.lcom+4.pem',
    'key-file' : '/etc/letsencrypt/live/smartirrigationsystem.me/privkey.pem',
    'cert-file': '/etc/letsencrypt/live/smartirrigationsystem.me/fullchain.pem',
    'dh-strongfile': './tls/dhparam.pem',
    'jwt-key': './tls/jwtRS256.key',
    'jwt-public-key': './tls/jwtRS256.key.pub',
    'main_db_url': "'mongodb+srv://wissal14:wissal1998@wotproject.8qfds.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'",
    'jwtValidityTimeInSeconds': 36000,
    'actualRefreshSecret': "refreshme",
    'permissionLevels': {
        'Master':2048,
        'Member':1,
        'Surfer':2
    },
}