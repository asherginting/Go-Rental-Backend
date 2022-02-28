const checkPhone = (phone) => {
    let result = false;
    const res = [];
    const numSplit = phone.split('');
    for (let i = 1; i < numSplit.length; i += 1) {
        if (/\d/.test(numSplit[i])) {
            res.push('number');
        } else {
            res.push('notNum');
        }
    }

    if (phone.length <= 14 && phone.length >= 10) {
        if (phone[0] === '0' || (phone[0] === '+' && phone[1] === '6' && phone[2] === '2')) {
            if (!res.includes('notNum')) {
                result = true;
            }
        }
    }

    return result;
};

const checkDate = (date) => {
    let check = false;
    if (String(date).length === 10) {
        if (date[4] === '-' && date[7] === '-') {
            const dateArr = date.split('-');
            const not = /\D/g;
            if (!not.test(dateArr[0]) && !not.test(dateArr[0]) && !not.test(dateArr[0])) {
                const year = parseInt(dateArr[0], 10);
                const month = parseInt(dateArr[1], 10);
                const day = parseInt(dateArr[2], 10);

                if (year > 1000 && year < 3000) {
                    if (month > 0 && month <= 12) {
                        const montLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                        if (year % 4 === 0) montLength[1] = 29;
                        if (day > 0 && day <= montLength[month - 1]) {
                            check = true;
                        }
                    }
                }
            }
        }
    }
    return check;
};

const checkEmail = (mail) => {
    let result = false;
    const arrEmail = mail.split('');

    if (/\D/.test(arrEmail[0])) {
        if (arrEmail.includes('@') && arrEmail.includes('.')) {
            result = true;
        }
    }
    return result;
};

const checkStartEnd = (start, end) => {
    let result = false;
    const rentStart = String(start).split('-');
    const rentEnd = String(end).split('-');
    if (rentStart[0] <= rentEnd[0] && rentStart[1] <= rentEnd[1] && rentStart[2] < rentEnd[2]) {
        result = true;
    }
    return result;
};

const checkPassword = (pass) => {
    let result = false;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass) && /[0-9]/.test(pass) && pass.length >= 6) {
        result = true;
    }

    return result;
};

module.exports = {
    checkPhone,
    checkDate,
    checkEmail,
    checkStartEnd,
    checkPassword,
};
