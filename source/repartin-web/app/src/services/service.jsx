import axios from 'axios';

const url = 'http://localhost:3000';


const service = {
    getById: async (path, id) => {
        console.log(`Buscando documento em ${path} usando o id: ${id}`);

        return axios.get(`${url}/${path}/${id}`)
            .then((response) => {
                if (response.status == 200) {
                    return response.data;
                } else {
                    return undefined;
                }
            })
            .catch((err) => {
                console.error(`Erro ao buscar documento em ${path}`);
                handleError(err);
            });
    },

    getByHouse: async (path, id) => {
        console.log(`Buscando documento em ${path} usando o house id: ${id}`);

        return axios.get(`${url}/${path}/house/${id}`)
            .then((response) => {
                if (response.status == 200) {
                    return response.data;
                } else {
                    return undefined;
                }
            })
            .catch((err) => {
                console.error(`Erro ao buscar documento em ${path}`);
                handleError(err);
                return undefined;

            });
    },

    create: async (path, body) => {
        console.log(`Criando novo documento em ${path} com o body: ${JSON.stringify(body)}`);

        return axios.post(`${url}/${path}`, body)
            .then(response => {
                return response.data;
            }).catch((err) => {
                console.error(`Erro ao inserir documento em ${path}`);
                handleError(err);
                return undefined;
            });
    },

    update: async (path, id, body) => {
        console.log(`Atualizando documento em ${path} com o body: ${JSON.stringify(body)}`);

        return axios.put(`${url}/${path}/${id}`, body)
            .then(response => {
                return response.data;
            }).catch((error) => {
                console.error(`Erro ao atualizar documento em ${path}`);
                handleError(error);
                return undefined;
            });
    },

    delete: async (path, id) => {
        console.log(`Deletando documento em ${path} com o id: ${JSON.stringify(id)}`);

        return axios.delete(`${url}/${path}/${id}`)
            .then(response => {
                return response.data;
            }).catch((error) => {
                console.error(`Erro ao deletar documento em ${path}`);
                handleError(error);
                return undefined;
            });
    },

    getAddress: async (cep) => {
        let cepFormatted = cep.replace("-", "");

        return axios.get(`https://viacep.com.br/ws/${cepFormatted}/json/`)
            .then(response => {
                return response.data;
            }).catch((error) => {
                console.error(`Erro ao buscar cep ${cep}`);
                handleError(error);
                return undefined;
            });

    },
    saveCredential: (token) => {
        localStorage.setItem('auth-credential', JSON.stringify(token));
    },

    getCredential: () => {
        var retrievedObject = localStorage.getItem('auth-credential');
        return JSON.parse(JSON.parse(retrievedObject));
    }
}

function handleError(error) {
    const err = JSON.parse(JSON.stringify(error));

    if (err.response) {
        const status = err.response.status;
        const message = err.response.data.message;
        console.log(`HTTP STATUS: ${status}`);
        console.log(`MENSAGEM: ${message}`);
    } 
    console.error(`ERROR: ${JSON.stringify(error)}`);


}
export default service;
