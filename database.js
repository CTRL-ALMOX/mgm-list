// Base de dados de materiais
// Aqui você pode adicionar todos os seus materiais
const databaseMateriais = [
    {
        codigo: "001",
        descricao: "Cimento Portland CP-II",
        und: "SC"
    },
    {
        codigo: "002",
        descricao: "Areia Média Lavada",
        und: "M3"
    },
    {
        codigo: "003",
        descricao: "Brita 1",
        und: "M3"
    },
    {
        codigo: "004",
        descricao: "Barra de Aço CA-50 10mm",
        und: "KG"
    },
    {
        codigo: "005",
        descricao: "Tijolo Cerâmico 8 furos",
        und: "UN"
    },
    {
        codigo: "006",
        descricao: "Argamassa Colante AC-II",
        und: "SC"
    },
    {
        codigo: "007",
        descricao: "Tubo PVC 100mm",
        und: "M"
    },
    {
        codigo: "008",
        descricao: "Fio Elétrico 2.5mm²",
        und: "M"
    },
    {
        codigo: "009",
        descricao: "Tinta Látex Branca 18L",
        und: "LT"
    },
    {
        codigo: "010",
        descricao: "Parafuso Autoatarraxante 4.2x19",
        und: "UN"
    }
    // Adicione mais materiais conforme necessário
];

// Função para consultar material pelo código
function consultarMaterial(codigo) {
    return databaseMateriais.find(material => material.codigo === codigo);
}