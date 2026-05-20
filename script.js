// Contador de materiais
let materialCount = 0;

// Função para criar um novo item de material
function criarMaterialItem() {
    materialCount++;
    const materialItem = document.createElement('div');
    materialItem.className = 'material-item';
    materialItem.id = `material-${materialCount}`;
    
    materialItem.innerHTML = `
        <div class="material-header">
            <span class="material-number">Material #${materialCount}</span>
            <button type="button" class="btn-remove-material" onclick="removerMaterial('material-${materialCount}')">
                ✕
            </button>
        </div>
        <div class="material-row">
            <div class="material-field">
                <label for="codigo-${materialCount}">Código</label>
                <input 
                    type="text" 
                    id="codigo-${materialCount}" 
                    class="input-codigo" 
                    placeholder="Código"
                    onchange="buscarMaterial('${materialCount}')"
                >
            </div>
            <div class="material-field">
                <label for="descricao-${materialCount}">Descrição</label>
                <input 
                    type="text" 
                    id="descricao-${materialCount}" 
                    class="input-descricao" 
                    placeholder="Descrição"
                    readonly
                >
            </div>
            <div class="material-field">
                <label for="und-${materialCount}">UND</label>
                <input 
                    type="text" 
                    id="und-${materialCount}" 
                    class="input-und" 
                    placeholder="UND"
                    readonly
                >
            </div>
            <div class="material-field">
                <label for="qtd-${materialCount}">Qtd. RMA</label>
                <input 
                    type="text" 
                    id="qtd-${materialCount}" 
                    class="input-qtd" 
                    placeholder="Quantidade"
                >
            </div>
        </div>
    `;
    
    return materialItem;
}

// Função para adicionar material
function adicionarMaterial() {
    const container = document.getElementById('materiais-container');
    const materialItem = criarMaterialItem();
    container.appendChild(materialItem);
    
    // Focar no campo de código do novo material
    const codigoInput = document.getElementById(`codigo-${materialCount}`);
    codigoInput.focus();
}

// Função para remover material
function removerMaterial(id) {
    const materialItem = document.getElementById(id);
    materialItem.remove();
}

// Função para buscar material pelo código
function buscarMaterial(id) {
    const codigoInput = document.getElementById(`codigo-${id}`);
    const descricaoInput = document.getElementById(`descricao-${id}`);
    const undInput = document.getElementById(`und-${id}`);
    
    const codigo = codigoInput.value.trim();
    
    if (codigo === '') {
        // Limpar campos se código estiver vazio
        descricaoInput.value = '';
        undInput.value = '';
        descricaoInput.style.borderColor = '#E2E8F0';
        undInput.style.borderColor = '#E2E8F0';
        return;
    }
    
    // Consultar na base de dados
    const material = consultarMaterial(codigo);
    
    if (material) {
        // Material encontrado - preencher automaticamente
        descricaoInput.value = material.descricao;
        undInput.value = material.und;
        descricaoInput.style.borderColor = '#48BB78'; // Verde para sucesso
        undInput.style.borderColor = '#48BB78'; // Verde para sucesso
        
        // Focar no campo de quantidade
        const qtdInput = document.getElementById(`qtd-${id}`);
        qtdInput.focus();
    } else {
        // Material não encontrado
        descricaoInput.value = 'Material não encontrado';
        undInput.value = '---';
        descricaoInput.style.borderColor = '#FC8181'; // Vermelho para erro
        undInput.style.borderColor = '#FC8181'; // Vermelho para erro
    }
}

// Função para coletar todos os dados do formulário
function coletarDadosFormulario() {
    const materiais = [];
    const materialItems = document.querySelectorAll('.material-item');
    
    materialItems.forEach(item => {
        const id = item.id.split('-')[1];
        const codigo = document.getElementById(`codigo-${id}`).value;
        const descricao = document.getElementById(`descricao-${id}`).value;
        const und = document.getElementById(`und-${id}`).value;
        const qtd = document.getElementById(`qtd-${id}`).value;
        
        materiais.push({
            codigo,
            descricao,
            und,
            quantidade: qtd
        });
    });
    
    return {
        numeroObra: document.getElementById('numero-obra').value,
        separador: document.getElementById('separador').value,
        matriculaSeparador: document.getElementById('matricula-separador').value,
        encarregado: document.getElementById('encarregado').value,
        matriculaEncarregado: document.getElementById('matricula-encarregado').value,
        conferente: document.getElementById('conferente').value,
        matriculaConferente: document.getElementById('matricula-conferente').value,
        materiais: materiais
    };
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Botão Adicionar Material
    document.getElementById('btn-add-material').addEventListener('click', adicionarMaterial);
    
    // Envio do formulário
    document.getElementById('mgmForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const dados = coletarDadosFormulario();
        console.log('Dados do formulário:', dados);
        
        // Aqui você pode enviar os dados para um servidor
        alert('Formulário enviado com sucesso!\nVerifique o console para ver os dados.');
    });
});