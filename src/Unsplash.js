export class Unsplash {
  // Método estático para obter a URL de uma imagem da API do Unsplash com base em uma palavra-chave
  static search(keyword) {
    const accessKey = '-voBmf1WaTYkaw1lLVDuB26-CpyOqpzbH32jmG1x8DM' // Chave de acesso à API do Unsplash (Substitua pela sua chave)
    const endpoint = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&query=${keyword}`

    // Executa uma solicitação 'fetch' para a API do Unsplash e retorna a promessa resultante
    return fetch(endpoint)
      .then(data => data.json()) // Converte a resposta em JSON
      .then(data => {
        const url = data.urls.small
        const description = data.al_description
        return { url, description }
      }) // Extrai a URL da imagem pequena (small) da resposta JSON
      .catch(error => {
        console.error('Erro ao buscar a imagem:', error) // Exibe um erro no console caso ocorra um erro na busca da imagem
        return null // Retorna nulo em caso de erro, indicando que a imagem não foi encontrada
      })
  }
}
