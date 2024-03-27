
class StringChecker {
    private hasSpecialChar(string: string) {
        const regex = /[\W_]/;
        return regex.test(string);
    }

    private hasNumber(string: string) {
        const regex = /[0-9]/;
        return regex.test(string);
    }

    private hasSpace(string: string) {
        const regex = /[\s]/;
        return regex.test(string);
    }

    scanEmail(email: string) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    scan(string: string): boolean {
        let isValid = true;

        if (this.hasNumber(string) || this.hasSpace(string) || this.hasSpecialChar(string)) {
            isValid = false;
        }

        return isValid;
    }

    scanSpaceAndChar(string: string): boolean {
        let isValid = true;

        if (this.hasSpace(string) || this.hasSpecialChar(string)) {
            isValid = false;
        }

        return isValid;
    }
}

export class NumberChecker {
    private isNumber(data: any): boolean {
        return !isNaN(data);
    }

    scan(number: any) {
        let isValid = true;

        if (!this.isNumber(number)) {
            isValid = false;
        }

        return isValid;
    }
}



class Checker {
    private stringChecker: StringChecker;
    private numberChecker: NumberChecker;

    constructor() {
        this.stringChecker = new StringChecker();
        this.numberChecker = new NumberChecker();
    }
}

export default StringChecker;