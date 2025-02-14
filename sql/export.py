import json

# Supondo que o JSON esteja em um arquivo chamado 'dados.json'
with open('dados.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# Percorrer as nomenclaturas e extrair código e descrição
nomenclaturas = data.get("Nomenclaturas", [])

# Gerar a lista de tuplas com (Código, Descrição)
resultado = [(item["Codigo"], item["Descricao"]) for item in nomenclaturas]

# Exibir o resultado
for tupla in resultado:
    print(str(tupla).encode('utf-8', 'ignore').decode('utf-8') + ",")

