import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyDfxLZSjaHNu_HbSKTNuljmjYfYpkP6CTM",
    authDomain: "mgr-app-1995.firebaseapp.com",
    databaseURL: "https://mgr-app-1995.firebaseio.com",
    projectId: "mgr-app-1995",
    storageBucket: "mgr-app-1995.appspot.com",
    messagingSenderId: "582087547962"
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database();
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);


    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');

    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.user(authUser.uid)
                    .once('value')
                    .then(snapshot => {
                        const dbUser = snapshot.val();

                        if (!dbUser.roles) {
                            dbUser.roles = [];
                        }

                        authUser = {
                            uid: authUser.uid,
                            email: authUser.email,
                            ...dbUser,
                        };
                        next(authUser);
                    });
            } else {
                fallback();
            }
        });

    exercises = () => this.db.ref('exercises');

    exercise = uid => this.db.ref(`exercises/${uid}`);

    onExercisesListener = (next, fallback) => {
        this.exercises().on('value', snapshot => {
            if (!!snapshot) {
                const exercisesObject = snapshot.val();
                const exercisesList = !!exercisesObject ?
                    Object.keys(exercisesObject).map(key => ({
                        ...exercisesObject[key],
                        uid: key
                    })) : [];
                next(exercisesList);
            }
            else
                fallback();
        });
        return this.exercise();
    }

    removeExercise = uid => this.exercises().child(uid).remove();

    results = () => this.db.ref('results');

    result = uid => this.db.ref(`results/${uid}`);
}

export default Firebase;