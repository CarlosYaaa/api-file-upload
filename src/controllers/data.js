const XLSX = require('xlsx');
const fs = require('fs-extra');
const { diccionarioCategorias } = require('./diccionario');

async function ExcelToJson(req, res) {
    const fileName = req.file.filename;
    // "5fd6c0711d3938ee48b62ad4"
    const categoryMarketId = req.params.categoryMarketId
    try{
        const excel = XLSX.readFile(req.file.path);
        const nombreHoja = excel.SheetNames;
        const datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);
        const datosJSON = datos.map( item => {
        const categoria = item["Categoría"];
        const subCategory = `${categoria}-${categoryMarketId}`;

            return {
                name: item.Nombre,
                content: item.Contenido,
                unitOfMeasurement: item["Unidad de medida"],
                maxQuantityPerOrder: item["Cantidad máxima"],
                category: diccionarioCategorias[subCategory],
                categoryName: categoria,
                price: item.Precio,
                highlight: item["Destacar"] === 'SI'? true:false
            }
        });
        await fs.unlink(req.file.path);
        res.status(200).json({
            mssg: "Petición exitosa",
            products: datosJSON
        })
    } catch (err) {
        await fs.unlink(req.file.path);
        return res.status(500).json({
            message: 'Error interno de servidor, reintente en unos minutos por favor',
            error: err
        });
    }
};

module.exports = {
    ExcelToJson
}