:- use_module(library(lists)).
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/json)).
:- use_module(library(http/json_convert)).
:- use_module(library(term_to_json)).
:- use_module(library(http/http_json)).

:- http_handler('/bestRoute', bestRoute, []).			
:- http_handler('/heuristicTime', heuristicTime, []).			
:- http_handler('/heuristicMass', heuristicMass, []).			
:- http_handler('/heuristicTimeAndMass', heuristicTimeAndMass, []).			
:- http_handler('/loadTruck', loadTruck1, []).	
:- http_handler('/loadDelivery', loadDelivery1, []).			
:- http_handler('/loadSection', loadSection1, []).			
:- http_handler('/deleteDados', eliminarDados1, []).			
:- http_handler('/loadWarehouse', loadWarehouse1, []).			
		
		
				
server(Port) :-						
        http_server(http_dispatch, [port(Port)]).


        

loadTruck1(_Request):-
      http_parameters(_Request,
      [ truckName(Name, []),tara(Tara,[]),capacidade_carga(Capacidade_carga, []),
      carga_total_baterias(Carga_total_baterias, []),autonomia(Autonomia, []),t_recarr_bat_20a80(T_recarr_bat_20a80, [])]),
      loadTruck(Name,Tara,Capacidade_carga,Carga_total_baterias,Autonomia,T_recarr_bat_20a80),
      getTruck(L),
      prolog_to_json(L,JSON),
      reply_json(JSON).

loadWarehouse1(_Request):-
      http_parameters(_Request,
      [ nameWarehouse(Name, []),idWarehouse(IdArmazem,[])]),
      loadWarehouse(IdArmazem,Name),
      getWarehouses(L),
      prolog_to_json(L,JSON),
      reply_json(JSON).

loadDelivery1(_Request):-
      http_parameters(_Request,[ deliveryId(Id, []),date(Date,[]),massa(MassaEntrega, []),
      armazem(Armazem, []),loadTime(LoadTime, []),unloadTime(UnloadTime, [])]),
      loadDelivery(Id,Date,MassaEntrega,Armazem,LoadTime,UnloadTime),
      getDeliveries(L),
      prolog_to_json(L,JSON),
      reply_json(JSON).

loadSection1(_Request):-
      http_parameters(_Request,[ truckName(Plate, []),origin(WarehouseOrig,[]),destin(WarehouseDest, []),
      tempo(Time, []),energia(Energy, []),tempoExtra(ExtraTime, [])]),
      loadSection(Plate,WarehouseOrig,WarehouseDest,Time,Energy,ExtraTime),
      getSections(L),
      prolog_to_json(L,JSON),
      reply_json(JSON).

eliminarDados1(_Request):-
      http_parameters(_Request,[]),
      eliminarDados(),
      prolog_to_json([],JSON),
      reply_json(JSON).



bestRoute(_Request) :-    
        http_parameters(_Request,[ truckName(Name, []),deliveryDate(DeliveryDate,[])]),
        seq_custo_menor(Name,DeliveryDate,L,C),
        prolog_to_json([L,C],JSON),
        reply_json(JSON).

heuristicMass(_Request) :-    
        http_parameters(_Request,[ truckName(Name, []),deliveryDate(DeliveryDate,[])]),
        bestfsMass(Name,DeliveryDate,List,Cust),
        prolog_to_json([List,Cust],JSON),
        reply_json(JSON).

heuristicTime(_Request) :-    
        http_parameters(_Request,[ truckName(Name, []),deliveryDate(DeliveryDate,[])]),
        bestfsTime(Name,DeliveryDate,List,Cust),
        prolog_to_json([List,Cust],JSON),
        reply_json(JSON).        


heuristicTimeAndMass(_Request) :-    
      http_parameters(_Request,[ truckName(Name, []),deliveryDate(DeliveryDate,[])]),
      bestfsTimeAndMass(Name,DeliveryDate,List,Cust),
      prolog_to_json([List,Cust],JSON),
      reply_json(JSON).       


      	
:-dynamic custo_menor/2.
:-dynamic aluno/2.
:-dynamic idArmazem/2.
:-dynamic carateristicasCam/6.
:-dynamic entrega/6.       
:-dynamic dadosCam_t_e_ta/6.       




%idArmazem(<local>,<codigo>)
%entrega(<idEntrega>,<data>,<massaEntrefa>,<armazemEntrega>,<tempoColoc>,<tempoRet>)
%carateristicasCam(<nome_camiao>,<tara>,<capacidade_carga>,<carga_total_baterias>,<autonomia>,<t_recarr_bat_20a80>).
%dadosCam_t_e_ta(<nome_camiao>,<cidade_origem>,<cidade_destino>,<tempo>,<energia>,<tempo_adicional>).


obterIdArmazemDaEntrega(Date,L):- findall(X,entrega(_,Date,_,X,_,_),L).

obterTodosOsCaminhos(Plate,Date,L):-obterIdArmazemDaEntrega(Plate,Date,R),findall(LP, permutation(R,LP), L).

obterTempoEntrePercurso(L_entrega,Orig,Plate,Peso,Res):-
      carateristicasCam(Plate,Tara,Capacidade_carga,Carga_total_baterias,Autonomia,T_recarr_bat_20a80),
      retractall(carateristicasCam(Plate,_,_,_,_,_)),
      assertz(carateristicasCam(Plate,Tara,Capacidade_carga,Carga_total_baterias,(100),T_recarr_bat_20a80)),
      carateristicasCam(Plate,_,_,_,A,_),
      obterTempoEntrePercurso2(L_entrega,Orig,Plate,Peso,Res),!.


obterTempoEntrePercurso2([IdEntrega],Orig,Plate,Peso,Res):- 
      idArmazem('Matosinhos',Dest),
      entrega(IdEntrega,_,Massa_carga,ArmazemEntrega,_,Tempo_ret),
      obterTempoEntreDoisArmazens(Orig,ArmazemEntrega,Plate,Peso,X),
      Peso_Camiao_Atualizado is (Peso-Massa_carga),
      obterTempoDentroDoArmazem(ArmazemEntrega,Dest,Plate,Tempo_ret,Peso_Camiao_Atualizado,T_no_Armazem),
      obterTempoEntreDoisArmazens(ArmazemEntrega,Dest,Plate,Peso,X1),
      Res is (X+T_no_Armazem+X1).

obterTempoEntrePercurso2([IdEntrega,IdEntrega2|Z],Orig,Plate,Peso,Res):-
      entrega(IdEntrega,_,Massa_carga,ArmazemEntrega,_,Tempo_ret),
      entrega(IdEntrega2,_,_,ArmazemEntrega2,_,_),
      obterTempoEntreDoisArmazens(Orig,ArmazemEntrega,Plate,Peso,X),
      Peso_Camiao_Atualizado is (Peso-Massa_carga),
      obterTempoDentroDoArmazem(ArmazemEntrega,ArmazemEntrega2,Plate,Tempo_ret,Peso_Camiao_Atualizado,T_no_Armazem),
      obterTempoEntrePercurso2([IdEntrega2|Z],ArmazemEntrega,Plate,Peso_Camiao_Atualizado,Res1),
      Res is Res1+X+T_no_Armazem,!.

%DESCOBRIR PESO DE UM CAMIAO ATRAVES DE uma lista de entregas 
find_peso_total([],0).
find_peso_total([L|R],Res):-find_peso_total(R,Res1),entrega(L,_,Aux,_,_,_), Res is Res1 + Aux.


obterTempoEntreDoisArmazens(A1,A2,Plate,Peso_Camiao,Tempo_percurso):-

      carateristicasCam(Plate,Tara,Capacidade_carga,Carga_total_baterias,Autonomia,T_recarr_bat_20a80),
      Peso_Camiao_max is Tara+Capacidade_carga,
      dadosCam_t_e_ta(Plate,A1,A2N,Tempo,Energia,Tempo_adicional),
      round(Peso_Camiao*Tempo/Peso_Camiao_max,Aux,2),Tempo_percurso is Aux+Tempo_adicional,
      round(Peso_Camiao*Energia/Peso_Camiao_max,Energia_Gasta,2),
          Autonomia_atualizada is (Autonomia-Energia_Gasta),
      retractall(carateristicasCam(Plate,_,_,_,_,_)),
      assertz(carateristicasCam(Plate,Tara,Capacidade_carga,Carga_total_baterias,(Autonomia_atualizada),T_recarr_bat_20a80)),!.
     

obterTempoDentroDoArmazem(Orig,Dest,Plate,Tempo_ret,Peso_Camiao,Res):-
      carateristicasCam(Plate,Tara,Capacidade_carga,Carga_total_baterias,Autonomia,T_recarr_bat_20a80),
      Peso_Camiao_max is Tara+Capacidade_carga,
      dadosCam_t_e_ta(Plate,OrigN,DestN,_,Energia,_),
      round(Peso_Camiao*Energia/Peso_Camiao_max,Energia_Gasta,2),
      ((Autonomia-Energia_Gasta<20,!,Perc_Carre is 80-Autonomia,round(T_recarr_bat_20a80*Perc_Carre/60,T_recarr,2),
      (T_recarr<Tempo_ret,!,(Res is Tempo_ret);Res is T_recarr),
      retractall(carateristicasCam(Plate,_,_,_,_,_)),
      assertz(carateristicasCam(Plate,Tara,Capacidade_carga,Carga_total_baterias,80,T_recarr_bat_20a80)));Res is Tempo_ret),!.

                   
seq_custo_menor(Plate,Date,LC,Custo):-(run(Plate,Date);true),custo_menor(LC,Custo).

run(Plate,Date):-
    retractall(custo_menor(_,_)),
    assertz(custo_menor(_,100000)),
    findall(X,entrega(X,Date,_,_,_,_),L_entrega),
    idArmazem('Matosinhos',X),
    carateristicasCam(Plate,Tare,_,_,A,_),
    find_peso_total(L_entrega,Peso_carga),Peso is Tare+Peso_carga,
    permutation(L_entrega,LCPerm),
    obterTempoEntrePercurso(LCPerm,X,Plate,Peso,Custo),
    atualiza(LCPerm,Custo),
    fail.

atualiza(LCPerm,Custo):-
  custo_menor(_,CustoMin),
  ((Custo<CustoMin,!,retract(custo_menor(_,_)),assertz(custo_menor(LCPerm,Custo)));true).

% o write(Custo),nl so para ver a atualizacao do menor custo
round(X,Y,D) :- Z is X * 10^D, round(Z, ZA), Y is ZA / 10^D.


         
bestfsTime(Plate,Date,Cam,Tempo):-
      findall(X,entrega(X,Date,_,_,_,_),L_entrega),
      bestfsTime2(Plate,5,[],L_entrega,Cam), 
      carateristicasCam(Plate,Tare,_,_,_,_),
      find_peso_total(Cam,Peso_carga),Peso is Tare+Peso_carga,
      obterTempoEntrePercurso(Cam,5,Plate,Peso,Tempo),!.


bestfsTime2(Plate,Orig,L_Aux,Lista_Entrega,Cam):-
      findall((Res,IdEntrega,NextIdArmazem),(entrega(X,_,_,IdArmazem,_,_),member(X,Lista_Entrega),dadosCam_t_e_ta(Plate,Orig,NextIdArmazem,Tempo,_,Tempo_adicional),IdEntrega is X,NextIdArmazem is IdArmazem,Res is Tempo+Tempo_adicional),Novos),
      sort(Novos,NovosOrd),
      NovosOrd = [(_,IdEntrega,NextIdArmazem)|_],

      append(L_Aux,[IdEntrega],Aux),


      delete(Lista_Entrega, IdEntrega,Resultado),

      bestfsTime2(Plate,NextIdArmazem,Aux,Resultado,Cam).
     

bestfsTime2(Plate,Orig,L,[],L).


 bestfsTimeAndMass(Plate,Date,Cam,Tempo):-
      findall(X,entrega(X,Date,_,_,_,_),L_entrega),
      bestfsTimeAndMass2(Plate,5,[],L_entrega,Cam), 
      carateristicasCam(Plate,Tare,_,_,_,_),
      find_peso_total(Cam,Peso_carga),Peso is Tare+Peso_carga,
      obterTempoEntrePercurso(Cam,5,Plate,Peso,Tempo),!.

      

bestfsTimeAndMass2(Plate,Orig,L_Aux,Lista_Entrega,Cam):-
      findall((M,IdEntrega,NextIdArmazem),(entrega(X,_,MassaEntrega,IdArmazem,_,_),member(X,Lista_Entrega),dadosCam_t_e_ta(Plate,Orig,NextIdArmazem,Tempo,_,Tempo_adicional),Res is Tempo+Tempo_adicional,M is MassaEntrega*Res,IdEntrega is X,NextIdArmazem is IdArmazem),Novos),
      sort(Novos,NovosOrd),
      reverse(NovosOrd,NovosOrdRev),
      NovosOrdRev = [(_,IdEntrega,NextIdArmazem)|_],
      append(L_Aux,[IdEntrega],Aux),
      delete(Lista_Entrega, IdEntrega,Resultado),
      bestfsTimeAndMass2(Plate,NextIdArmazem,Aux,Resultado,Cam).  

bestfsTimeAndMass2(Plate,_,L,[],L). 

bestfsMass(Plate,Date,Cam,Tempo):-
      findall(X,entrega(X,Date,_,_,_,_),L_entrega),
      bestfsMass2(Plate,[],L_entrega,Cam), 
      carateristicasCam(Plate,Tare,_,_,_,_),
      find_peso_total(Cam,Peso_carga),Peso is Tare+Peso_carga,
      obterTempoEntrePercurso(Cam,5,Plate,Peso,Tempo),!.




bestfsMass2(Plate,L_Aux,Lista_Entrega,Cam):-
      findall((M,IdEntrega),(entrega(X,_,MassaEntrega,_,_,_),member(X,Lista_Entrega),M is MassaEntrega,IdEntrega is X),Novos),
      sort(Novos,NovosOrd),
      reverse(NovosOrd,NovosOrdRev),
      NovosOrdRev = [(_,IdEntrega)|_],
      append(L_Aux,[IdEntrega],Aux),
      delete(Lista_Entrega, IdEntrega,Resultado),
      bestfsMass2(Plate,Aux,Resultado,Cam).     

bestfsMass2(Plate,L_Aux,[],L_Aux).      

getTruck(L):- findall(X,(carateristicasCam(X,_,_,_,_,_),write(X)),L).


loadTruck(Name,Tara,Capacidade_carga,Carga_total_baterias,Autonomia,T_recarr_bat_20a80):-
      atom_number(Tara,TaraN),atom_number(Autonomia,AutonomiaN),atom_number(T_recarr_bat_20a80,T_recarr_bat_20a80N),
      atom_number(Capacidade_carga,Capacidade_cargaN),atom_number(Carga_total_baterias,Carga_total_bateriasN),
      assertz(carateristicasCam(Name,TaraN,Capacidade_cargaN,Carga_total_bateriasN,AutonomiaN,T_recarr_bat_20a80N)).

loadDelivery(Id,Date,Massa,Armazem,LoadTime,UnloadTime):-
  atom_number(Id,IDN),
  atom_number(Armazem,ArmazemN),
      atom_number(Massa,MassaN),atom_number(LoadTime,LoadTimeN),
      atom_number(UnloadTime,UnloadTimeN),assertz(entrega(IDN,Date,MassaN,ArmazemN,LoadTimeN,UnloadTimeN)).

getDeliveries(L):- findall(X,(entrega(X,Date,M,_,_,_),write(X+Date+M),nl),L).

loadSection(Plate,WarehouseOrig,WarehouseDest,Time,Energy,ExtraTime):-
 atom_number(WarehouseOrig,WarehouseOrigN),atom_number(WarehouseDest,WarehouseDestN),
       atom_number(Time,TimeN),atom_number(Energy,EnergyN),
       atom_number(ExtraTime,ExtraTimeN),
      assertz(dadosCam_t_e_ta(Plate,WarehouseOrigN,WarehouseDestN,TimeN,EnergyN,ExtraTimeN)).

getSections(L):- findall(WarehouseOrig,dadosCam_t_e_ta(_,WarehouseOrig,_,_,_,_),L).

loadWarehouse(IdArmazem,Name):- atom_number(IdArmazem,IdArmazemN),assertz(idArmazem(Name,IdArmazemN)).

getWarehouses(L):- findall(IdArmazemN,idArmazem(_,IdArmazemN),L).


eliminarDados:- retractall(carateristicasCam(_,_,_,_,_,_)), retractall(idArmazem(_,_)),retractall(dadosCam_t_e_ta(_,_,_,_,_,_)), retractall(entrega(_,_,_,_,_,_)).
