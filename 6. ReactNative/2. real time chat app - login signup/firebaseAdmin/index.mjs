import admin from 'firebase-admin'

var serviceAccount = {
    "type": "service_account",
    "project_id": "storage-deletethis",
    "private_key_id": "55490499884594e4b6f56554ed6e22b65f76220c",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQDSqIzuctKeq6Xt\n7FSDpMilEqITURGUCu6YzXn3ViPSk/FU1+dkpwfzvIQcBxgG/maN8H8Zrjbc3bVN\nr1VgUuFPgnKO9Av7Wv3tFJ/GzwV3IIQDcK0DP+BPcxYs9QqONiDproZTt4XDuRGs\nzA5GNp/JdXFcTZbeM/5bt7qUH/ux5p9LHZRj5a695QV6ofF87jfWpb2mArVdGtZe\noQKkYe6KNtZAh+uywESH9sS5KFkKLcNdvDT5qf4tHOyytc2a/i7/IVmUld3fWXab\n8qv0OJWTpkgHPojxjYnaRx8jmo/7PocFbWa7UMavTPWdhGUJqct8utt+7LGW61jo\nDXxZfoB3AgMBAAECgf9ry9RSMG+Wwj8mgMi+lJQX5HELcXCNUQrHJl5DMtEh8JKN\n1+2Qk+h90PnJXdftvEC+YVKo0X1BiDI+jnoh0Ed7aEU24as/9E/8AZHBKi6hxwHG\nwOHHx+gAv+OZHctI+mndKnGSZVcN0KY6xjCHvWwGqxJXKV0KV5DRXjMbmUIyxeL2\nMLaFklkIbKT58UMERHpTKWiC7HxnB9X7lDD6TA4/8/GOw7R8GgJbt2gdIpny+oJc\nKXyjolAkyPXHrf4mIjUe9SusF+asquNtNSp4g5gvBj0l0U5wzZL6gaeDNOz6/ZJ6\n2p3SbXgXmSZv9PCmw2J9JlmiMjXWjpy7k5qnteECgYEA72yODOpG6zRbKTCx0Jyf\nQeDtVL0nprtgxSdm/CZ/SmuTapv1uRo13tjyj2SnZIlfbW1WydpzlnB5ml/PxnDh\nob6CzVMgFpBQEcQlj7aEQ9coVvFL21aQIqIp3Yqx49XWR9iw8uzwvnovjCpmXpoY\nJzARuPspCF4mpnw6cN3Wu2cCgYEA4T4qi/I5ZoIqvD0Q4mv59sGpTDw8xbBZ2ISV\niFXYzgsUYtQK2Dc1Zr07YpvAC8nuqU7XD6m5bgio+zwm9elgQIqOWDcsWlPJwnXn\nT624Gae9msPC49F+Wfd33eVk4n92zOl16bD52Ep6vWkjJnf3MIJVaz5Mwo81KQ+b\nq0ZG+HECgYBkiqCIWeVYJg9WF8XEBdF2976SRDCferZjdG1x27S+irhIH6ArkA8p\nOs95WdpVhL6XFEBK2bqKZUcbhbqZ6ZNGudrx4ENsVkPZghYH6KxYVMTy5bdmL06t\nzI1qJDEZrRWj7CI6kTdztZm78Z41gd48rpnypT4Q7oCqjyZ3eSEQZwKBgHA5dh9m\nH31Yi4xgbKIzpEZytTRbqvfgZtN/M7XK+Auo745SEdkqoLvAuu7lpSj6gqPuuS5/\npPkS7YbHsK3DioZ9wnBnhPy4VIVEE2zapCh8L/cFZHv37BlNOHbhjYNgeMOd6nb2\nC3Xdngvzb2UCTrHnrkGRt9MUYStFMI2EpWWxAoGBAOsjrDFGTnLrD1mZQlcDq6qd\np/60md2Z66wy4tfwkYb2oVngztvanSz9G8rW3bI/vIpfjC04AgcSgjtMl5HrLZWE\nasRxmtvfQ3kIzrW/gWsCrT5aIYVjx9x9/1U91X5y6HtPAvwr5BvR3UjK6l6jSlmf\nIZSjojn7nU/bnWFqn+5m\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-ymb8l@storage-deletethis.iam.gserviceaccount.com",
    "client_id": "107661331860424932345",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ymb8l%40storage-deletethis.iam.gserviceaccount.com"
}
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://storage-deletethis.firebaseio.com"
});
const bucket = admin.storage().bucket("gs://storage-deletethis.appspot.com");

export default bucket;