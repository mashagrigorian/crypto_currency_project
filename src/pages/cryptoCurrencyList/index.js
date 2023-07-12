import React from 'react';
import Table from '../../components/table';
import Loading from '../../components/loading';
import Pagination from '../../components/pagination';

class CryptoCurrencyList extends React.Component {
    constructor() {  //1
        super();
        this.state = { //
            loading: false,
            data: [],
            error: null,
            page: 1,
        }
    }


    async handleGetCurrenciesList() {
        const { page } = this.state;
        this.setState({
            loading: true
        })

        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/?page=${page}&per_page=10`);
            const result = await response.json(); 
            this.setState({ 
                data: result
            })

        } catch(error) {
            this.setState({
                error: 'Errror Ooooooops'
            })
        } finally {
            this.setState({
                loading: false,
            })
        }
    }

    handleChangePagination = (direction) => {
        const { page } = this.state;
        const currentPage = direction === 'next' ? page + 1 : page - 1;
        this.setState({ 
            page: currentPage
        }, this.handleGetCurrenciesList)
    }
    

    componentDidMount() {  //1 mounte
        this.handleGetCurrenciesList(); //backend data
    }

    render() {  
        const { loading, error, page, data } = this.state;
        
        if (error) {
            return (
                <div className='error'>
                    <p>{error}</p>
                </div>
            )
        }
        
        if (loading) {
            return (
                <div className='loading-container'>
                    <Loading width="80px" height="80px" />
                </div>
            )
        }
      
        return (
            <div>
                <Table currencyList={data} />
                <Pagination 
                    page={page}
                    onHandleChangePagination={this.handleChangePagination}
                />
            </div>
        )
    }
}

export default CryptoCurrencyList;