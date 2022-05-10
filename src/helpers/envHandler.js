let APP_URL = '';
const { ENVIRONMENT } = process.env;
if (ENVIRONMENT === 'production') {
    // eslint-disable-next-line no-unused-vars
    APP_URL = `${process.env.APP_URL}/`;
}