
class StringChecker {
    public hasSpecialChar(string: string) {
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

    /**
     * 
     * @param string 
     * @returns true if there's no space and special characters
     */
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

    /**
     * 
     * @param number 
     * @returns true if it's a number
     */
    scan(number: any) {
        let isValid = true;

        if (!this.isNumber(number)) {
            isValid = false;
        }

        return isValid;
    }

    /**
     * 
     * @param price 
     * @returns true if price is valid
     */
    scanPrice(price: number) {
        if (price <= 0) return false;

        return true;
    }

    /**
    * 
    * @param price 
    * @returns true if amount is valid
    */
    scanAmount(amount: number) {
        if (amount <= 0) return false;

        return true;
    }
}

export class ObjectChecker {
    isEmptyObject(obj: Object) {
        return Object.keys(obj).length === 0;
    };
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