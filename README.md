push service untuk ecampus dan eschool


PARAMETER TAMBAHAN:
"kode" : untuk membedakan firebase app satu dengan yg lain
         misal aplikasi ecampus ada di applikasiFirebase1
         dan eschool ada di aplikasiFirebase2

         maka bisa dibuat "kode" : "ecampus" untuk ecampus
         dan "kode" : "eschool" untuk eschool

         kode perlu di register di app.js agar bisa dibaca oleh server
         dan app firebase dengan config harus juga diregister di app.js

         misal:
         
            const appYtb = admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),

            }, 'firebaseYtb');

            const appSanter = admin.initializeApp({
                credential: admin.credential.cert(serviceAccountSanter),
            }, 'firebaseSanter');


        credential di taruh di directory /config dan diimport ke app.js, 
        credential diambil dari firebase console

        misal:

            import serviceAccountSanter from './config/firebaseConfig.json'  with { type: 'json' };
            import serviceAccount from './config/ecampus-mobile-dev-firebase-adminsdk-lq07e-cd95b3e397.json'  with { type: 'json' };



Send push message single device :

HOST:PORT/push
http://localhost:3000/push

contoh body:
    {
        "kode":"KODE",
        "data": {
            "id": "1",
            "info": "Info 1...10"
          
        },
        "notification": {
             "title" : "Info A 1",
             "body" : "This is test notification android"
         }, 
        "token": "fJVPw3KQQjClqR3fZEU-uN:APA91bGFLG-ZkreNRLzOZNzvVl7FbVnqciBK1QPFKCJ_W0dusf3ZyCtvhydTWSMc12qjyca8QszffvtE1iTUuXhJ6IPdpWUfnIMm6XD4agiC607SZuUQ-6k"
    }

Send push message multiple device :
HOST:PORT/push_multiple_devices
http://localhost:3000/push_multiple_devices

contoh body:

    {
        "kode":"KODE",
        "data": {
            "id": "1",
            "info": "Info 1...10"
          
        },
        "notification": {
             "title" : "Info A 1",
             "body" : "This is test notification android"
         }, 
        "tokens": ["fJVPw3KQQjClqR3fZEU-uN:APA91bGFLG-ZkreNRLzOZNzvVl7FbVnqciBK1QPFKCJ_W0dusf3ZyCtvhydTWSMc12qjyca8QszffvtE1iTUuXhJ6IPdpWUfnIMm6XD4agiC607SZuUQ-6k"]
    }