
export class AuthService {

    private loggedIn: boolean = false;

    // it takes 200ms to determine if we user is logged in or not.
    // this method gets activated on those routes which are guarded
    isAuthenticated() {
        const promise = new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.loggedIn);
                }, 200);
            }
        );
        return promise;
    }

    login() {
        this.loggedIn = true;
        alert("user logged In ... ");
    }

    logout() {
        this.loggedIn = false;
        alert("user logged Out ... ");
    }
}