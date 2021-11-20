function InfoAcccount(){
    this.getListAccount=function(){
        return axios({
            url:"https://6183caa491d76c00172d1b4b.mockapi.io/api/product",
            method:"GET",
        });
    }
    this.deleteAccount=function(id){
        return axios({
            url:`https://6183caa491d76c00172d1b4b.mockapi.io/api/product/${id}`,
            method:"DELETE",
        });
    }
    this.addAccount=function(account){
        return axios({
            url:`https://6183caa491d76c00172d1b4b.mockapi.io/api/product`,
            method:"POST",
            data:account
        });
    }
    this.editAccount=function(id){
        return axios({
            url:`https://6183caa491d76c00172d1b4b.mockapi.io/api/product/${id}`,
            method:"GET",
        });
    }
    this.updateAccount=function(account){
        return axios({
            url:`https://6183caa491d76c00172d1b4b.mockapi.io/api/product/${account.id}`,
            method:"PUT",
            data:account
        });
    }
}