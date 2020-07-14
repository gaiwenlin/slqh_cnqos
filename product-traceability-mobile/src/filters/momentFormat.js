import moment from 'moment';
export default (value, format = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(value).format(format);
};
