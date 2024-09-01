import { parse, format } from 'date-fns';
import { es } from 'date-fns/locale';

  
function changeFormatDate (date)  {
    const dateString = date

    const parseFormat = 'd \'de\' MMMM \'de\' yyyy';
    const outputFormat = 'yyyy-MM-dd';

    const parsedDate = parse(dateString, parseFormat, new Date(), { locale: es });
    const formattedDate = format(parsedDate, outputFormat);

       return formattedDate

}

function putFullName (name,lastName) {
  
    return  `${name} ${lastName}`
}


export  {
    changeFormatDate,
    putFullName
}