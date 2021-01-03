const XLSX = require('xlsx');
const { diccionarioCategorias } = require('./diccionario');

const ExcelToJson = () => {
    const excel = XLSX.readFile(
        "/media/carlosyaringanoa/Archivos/UNIVERSIDAD/PROYECTOS/SELLER-FILE-UPLOAD-BACKEND/src/prueba/ejemplo-subida-archivos.xlsx");
        var nombreHoja = excel.SheetNames;
        let datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);
        
    const datosJSON = datos.map( item => {
        const categoria = item["Categoría"];

        return {
            name: item.Nombre,
            content: item.Contenido,
            unitOfMeasurement: item["Unidad de medida"],
            maxQuantityPerOrder: item["Cantidad máxima"],
            category: {
                _id: diccionarioCategorias[categoria],
                name: categoria,
            },
            price: item.Precio,
            highlight: item["Destacar"] === 'SI'? true:false
        }
    })
    console.log(datosJSON);
};
ExcelToJson();