	
    /* global Parse */

Parse.initialize("cachacaGestor", "cachacagelada"); 	
    //var listaVendedores = [];
    var Tarefas;
    var listaDeTarefas;
    var digitaTarefas;
    
    
        	
   // window.addEventListener("load", initApp)
    angular.module("vendaCachaca", []);
    function funcao1(){
            alert("Vendedor adcionado!");
    };
    function funcao2(){
            alert("Vendedor excluido!");
    };
    angular.module("vendaCachaca").controller("vendaCachacaCtrl", function($scope){
            $scope.app = "Digite o nome dos vendedores e a quantidade para venda";
            $scope.vendedores = [];
            $scope.especie = [
                    {Tipo: "Caseira (alambique)"},
                    {Tipo: "Industrial"}
            ];
            $scope.adcionarVendedor = function (vendedor){
                    $scope.vendedores.push(angular.copy(vendedor));
                    delete $scope.vendedor;
            };
            
            $scope.classe1 = "selecionado";
            $scope.classe2 = "negrito";
            $scope.excluirVendedor = function (vendedores) {
                    $scope.vendedores = vendedores.filter(function (vendedor) {
                       if(!vendedor.selecionado) return vendedor; 
                    });
            };
            $scope.isVendedorSelecionado = function (vendedores){
                    return vendedores.some(function (vendedor){
                       return vendedor.selecionado; 
                    });
            };
            $scope.Inicia = function initApp(){
                    Tarefas = Parse.Object.extend("Tasks");
                    //showTasks busca tarefas já cadastradas em nosso app
                    showTasks();
                    document.getElementById("form-task").addEventListener("submit",onSubmit);
                    listaDeTarefas = document.getElementById("lista-tarefas");
                    digitaTarefas = document.getElementById("tarefa");
                    listaDeTarefas.addEventListener("click",clickList);
            };
            $scope.Listando = function clickList(e) {
                    if(e.target.localName === "li"){
                            e.target.dataset.done = (e.target.dataset.done === 'true')? false : true;
                            editTask(e.target.dataset.id,e.target.dataset.done);
                    }
            };
            $scope.Mostra = function showTasks(){
                var query = new Parse.Query("Tarefas");
                query.find({
                success:function(results){
                        var markupList = "";
                        for(var id in results){
                                console.log("success",results[id].attributes.descricao);
                                markupList += "<li class='item-task topcoat-list__item' data-id='"+results[id].id+"' data-done='"+ results[id].attributes.done +"'>"+ results[id].attributes.descricao +"</li>";
                        };
                                listaDeTarefas.innerHTML = markupList;
                        },
                        error:function(error){
                                console.log("error",error);
                        }
                });
                console.log(query);
            };
            $scope.Envia = function onSubmit(e){
                        var task = {};

                        task.descricao = digitaTarefas.value;
                        task.done = "false";

                        saveTask(task);
                        e.preventDefault();
            };
            $scope.Salva = function saveTask(task){
                        var taskCloud = new Tasks();
                        taskCloud.save(task).then(function(object) {
                            alert("Salvo com sucesso!");
                            showTasks();
                            digitaTarefas.value = "";
                        });
            };
           // $scope.inicio = window.addEventListener("load", initApp);
    });