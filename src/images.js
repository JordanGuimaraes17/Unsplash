// Importa a classe Unsplash do arquivo './Unsplash.js'
import { Unsplash } from './Unsplash.js'

// Classe Images representa uma coleção de imagens
export class Images {
  constructor(root) {
    this.root = document.querySelector(root) // Armazena o elemento raiz passado como argumento para a classe
    this.load() // Carrega as entradas de imagens a partir do localStorage
  }

  // Carrega as entradas de imagens a partir do localStorage
  load() {
    this.entries = JSON.parse(localStorage.getItem('Unsplash')) || [] // Obtém os dados do localStorage ou inicializa com um array vazio
  }

  // Salva as entradas de imagens no localStorage
  saveLocalStorage() {
    localStorage.setItem('Unsplash', JSON.stringify(this.entries)) // Armazena as entradas de imagens no localStorage convertendo-as em uma string JSON
  }

  async addImage(keyword) {
    this.tbody.innerHTML = '' // Limpa o conteúdo anterior da tabela
    try {
      for (let i = 0; i < 9; i++) {
        // Loop para adicionar duas imagens
        const imageUrl = await Unsplash.search(keyword) // Obtém uma URL de imagem usando a classe Unsplash
        if (imageUrl) {
          const section = this.createImageElement(imageUrl, i) // Cria o elemento HTML para a imagem usando a URL obtida
          this.tbody.appendChild(section) // Adiciona o elemento de imagem ao corpo da tabela
          this.entries.push(imageUrl) // Adiciona a URL da imagem às entradas
          this.saveLocalStorage() // Salva as alterações no localStorage
        } else {
          console.log('Imagem não encontrada.') // Exibe uma mensagem no console se a imagem não for encontrada
        }
      }
    } catch (error) {
      console.error('Erro ao buscar a imagem:', error) // Exibe um erro no console caso ocorra um erro durante a busca da imagem
    }
  }
}

// Classe ImageVisu estende a classe Images e adiciona funcionalidades para visualização de imagens
export class ImageVisu extends Images {
  constructor(root) {
    super(root) // Chama o construtor da classe Images para inicializar a herança
    this.tbody = this.root.querySelector('.Gallery') // Armazena o elemento 'main' como o corpo da tabela de imagens
    this.addButtonEvent() // Adiciona o evento de clique no botão de busca
  }

  // Adiciona um evento de clique no botão de busca
  addButtonEvent() {
    const button = document.querySelector('.search button') // Seleciona o botão de busca
    const input = document.querySelector('.search input') // Seleciona o campo de busca
    const addHide = document.querySelector('.Favorites')

    const handleButtonClick = () => {
      const { value } = input // Obtém o valor digitado no campo de busca
      this.addImage(value) // Chama o método addImage para adicionar a imagem relacionada ao valor digitado
      addHide.classList.add('hide')
    }

    const handleEnterKey = event => {
      if (event.key === 'Enter') {
        handleButtonClick() // Chama a função de clique do botão quando a tecla "Enter" é pressionada
        addHide.classList.add('hide')
      }
    }

    button.addEventListener('click', handleButtonClick) // Associa o clique do botão à função handleButtonClick
    input.addEventListener('keydown', handleEnterKey) // Associa a tecla "Enter" no campo de busca à função handleEnterKey
  }

  // Cria um elemento HTML para exibir uma imagem
  createImageElement(imageUrl, index) {
    const figure = document.createElement('figure')
    figure.classList.add('items')
    figure.style.setProperty('--delay', `${index * 0.2 + 0.8}s`)

    const img = document.createElement('img')
    img.src = imageUrl.url
    img.alt = imageUrl.description

    const figcaption = document.createElement('figcaption')
    figcaption.classList.add('details')

    figure.appendChild(img)
    figure.appendChild(figcaption)

    return figure
  }
}
