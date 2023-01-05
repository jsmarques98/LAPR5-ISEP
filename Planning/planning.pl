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
:- http_handler('/gera', gera1, []).			
		
		
				
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

gera1(_Request):-

      http_parameters(_Request,[ date(Date,[]),numberG(NG,[]),dimensaoP(DP,[]),percentagemC(PC,[]),percentagemM(PM,[]),valorReferencia(ValorReferencia,[])]),
      
	algoritmoGenetico(Date,Pop),
      prolog_to_json(Pop,JSON),
      reply_json(JSON).


bestRoute(_Request) :-   
      asserta(geracoes(3)) ,
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
:-dynamic geracoes/1.
:-dynamic populacao/1.
:-dynamic prob_cruzamento/1.
:-dynamic prob_mutacao/1.
:-dynamic aux/1.



%idArmazem(<local>,<codigo>)
%entrega(<idEntrega>,<data>,<massaEntrefa>,<armazemEntrega>,<tempoColoc>,<tempoRet>)
%carateristicasCam(<nome_camiao>,<tara>,<capacidade_carga>,<carga_total_baterias>,<autonomia>,<t_recarr_bat_20a80>).
%dadosCam_t_e_ta(<nome_camiao>,<cidade_origem>,<cidade_destino>,<tempo>,<energia>,<tempo_adicional>).


obterIdArmazemDaEntrega(Date,L):- findall(X,entrega(_,Date,_,X,_,_),L).

obterTodosOsCaminhos(Plate,Date,L):-obterIdArmazemDaEntrega(Plate,Date,R),findall(LP, permutation(R,LP), L).

obterTempoEntrePercurso(L_entrega,Plate,Res):-
      idArmazem('Matosinhos',Orig),
      carateristicasCam(Plate,Tara,Capacidade_carga,Carga_total_baterias,Autonomia,T_recarr_bat_20a80),
      find_peso_total(L_entrega,Peso_carga),Peso is Tara+Peso_carga,
      retractall(carateristicasCam(Plate,_,_,_,_,_)),
      assertz(carateristicasCam(Plate,Tara,Capacidade_carga,Carga_total_baterias,(100),T_recarr_bat_20a80)),

 
		
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
    permutation(L_entrega,LCPerm),
    obterTempoEntrePercurso(LCPerm,Plate,Custo),
    atualiza(LCPerm,Custo),
    fail.

atualiza(LCPerm,Custo):-
  custo_menor(_,CustoMin),
  ((Custo<CustoMin,!,retract(custo_menor(_,_)),assertz(custo_menor(LCPerm,Custo)));true).

% o write(Custo),nl so para ver a atualizacao do menor custo
round(X,Y,D) :- Z is X * 10^D, round(Z, ZA), Y is ZA / 10^D.

algoritmoGenetico(Date,T):-
      findall(X,entrega(X,Date,_,_,_,_),L_entrega),
      bestfsTime2('eTruck01',5,[],L_entrega,Cam), 
      obterTempoEntrePercurso(Cam,Plate,Tempo),associarCamioesListaEntregas(Cam,T),!.
         
bestfsTime(Plate,Date,Cam,Tempo):-
      findall(X,entrega(X,Date,_,_,_,_),L_entrega),
      bestfsTime2(Plate,5,[],L_entrega,Cam), 
      carateristicasCam(Plate,Tare,_,_,_,_),
      obterTempoEntrePercurso(Cam,Plate,Tempo),!.


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
      obterTempoEntrePercurso(Cam,Plate,Tempo),!.

      

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
       obterTempoEntrePercurso(Cam,Plate,Tempo),!.



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

getDeliveries(L):- findall(X,(entrega(X,Date,M,_,_,_)),L).

loadSection(Plate,WarehouseOrig,WarehouseDest,Time,Energy,ExtraTime):-
 atom_number(WarehouseOrig,WarehouseOrigN),atom_number(WarehouseDest,WarehouseDestN),
       atom_number(Time,TimeN),atom_number(Energy,EnergyN),
       atom_number(ExtraTime,ExtraTimeN),
      assertz(dadosCam_t_e_ta(Plate,WarehouseOrigN,WarehouseDestN,TimeN,EnergyN,ExtraTimeN)).

getSections(L):- findall(WarehouseOrig,dadosCam_t_e_ta(_,WarehouseOrig,_,_,_,_),L).

loadWarehouse(IdArmazem,Name):- atom_number(IdArmazem,IdArmazemN),assertz(idArmazem(Name,IdArmazemN)).

getWarehouses(L):- findall(IdArmazemN,idArmazem(_,IdArmazemN),L).


eliminarDados:- retractall(carateristicasCam(_,_,_,_,_,_)), retractall(idArmazem(_,_)),retractall(dadosCam_t_e_ta(_,_,_,_,_,_)), retractall(entrega(_,_,_,_,_,_)).


datas(Date,L):-findall(X,(entrega(X,Date,M,_,_,_)),L).



gera(Date,NG,DP,PC,PM,ValorReferencia,R):-
	(retract(geracoes(_));true), asserta(geracoes(NG)),
	(retract(populacao(_));true), asserta(populacao(DP)),
	(retract(prob_cruzamento(_));true), 	asserta(prob_cruzamento(PC/100)),
	(retract(prob_mutacao(_));true), asserta(prob_mutacao(PM/100)),
	gera_populacao(Pop,Date),
	avalia_populacao(Pop,PopAv),
	ordena_populacao(PopAv,PopOrd),
	geracoes(NG),
	gera_geracao(0,NG,PopOrd,ValorReferencia,Melhor_Individuo),associarCamioesListaEntregas(Melhor_Individuo,R),!.

gera_populacao(Pop,Date):-
	populacao(TamPop),
	findall(X,entrega(X,Date,_,_,_,_),L_entrega),
    
	length_1(L_entrega,NumE),
	(retract(tamanho_entrega(_));true), asserta(tamanho_entrega(NumE)),
	gera_populacao(0,TamPop,L_entrega,NumE,Pop),!.

gera_populacao(TamPop,TamPop,_,_,[]).

gera_populacao(NumPop,TamPop,L_entrega,NumT,[Ind|Resto]):-

	NumPop1 is NumPop+1,
	gera_populacao(NumPop1,TamPop,L_entrega,NumT,Resto),
	((NumPop<3,!,gera_individuo_heuristica(NumPop,'eTruck01','05/12/2022',Ind));gera_individuo(L_entrega,NumT,Ind)).


gera_individuo_heuristica(NumPop,Plate,Date,Ind):-
 
	(NumPop=0,!,bestfsTime(Plate,Date,Ind,T));
	NumPop=1,!,bestfsMass(Plate,Date,Ind,T);
	NumPop=2,!,bestfsTimeAndMass(Plate,Date,Ind,T).
gera_individuo([G],1,[G]):-!.

gera_individuo(L_entrega,NumT,[G|Resto]):-
	NumTemp is NumT + 1, % To use with random
	random(1,NumTemp,N),
	retira(N,L_entrega,G,NovaLista),
	NumT1 is NumT-1,
	gera_individuo(NovaLista,NumT1,Resto).

retira(1,[G|Resto],G,Resto).
retira(N,[G1|Resto],G,[G1|Resto1]):-
	N1 is N-1,
	retira(N1,Resto,G,Resto1).

avalia_populacao([],[]).
avalia_populacao([Ind|Resto],[Ind*V|Resto1]):-
	avalia_1(Ind,V),
	avalia_populacao(Resto,Resto1).

ordena_populacao(PopAv,PopAvOrd):-
	bsort(PopAv,PopAvOrd).

bsort([X],[X]):-!.
bsort([X|Xs],Ys):-
	bsort(Xs,Zs),
	btroca([X|Zs],Ys).


btroca([X],[X]):-!.

btroca([X*VX,Y*VY|L1],[Y*VY|L2]):-
	VX>VY,!,
	btroca([X*VX|L1],L2).

btroca([X|L1],[X|L2]):-btroca(L1,L2).


gera_geracao(G,G,[L*V|P],_,Res):-Res =L,!.

gera_geracao(N,G,[L*V|P],Menor,Res):-
	(V<Menor,!,Res = L);
    concatena_primeiros_n([L*V|P],2,R),
    random_permutation([L*V|P],PopPerm),
	cruzamento(PopPerm,NPop1),
	mutacao(NPop1,NPop),
	avalia_populacao(NPop,NPopAv),
    append(NPopAv,R,NPopA),
    remove_repetidos(NPopA,NPopAR),
    ordena_populacao(NPopAR,NPopOrd),
    N1 is N+1,
	gera_geracao(N1,G,NPopOrd,Menor,Res).

gerar_pontos_cruzamento(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).

gerar_pontos_cruzamento1(P1,P2):-
	tamanho_entrega(N),
	NTemp is N+1,
	random(1,NTemp,P11),
	random(1,NTemp,P21),
	P11\==P21,!,
	((P11<P21,!,P1=P11,P2=P21);(P1=P21,P2=P11)).
gerar_pontos_cruzamento1(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).


cruzamento([],[]).
cruzamento([Ind*_],[Ind]).
cruzamento([Ind1*_,Ind2*_|Resto],[NInd1,NInd2|Resto1]):-
	gerar_pontos_cruzamento(P1,P2),
	prob_cruzamento(Pcruz),random(0.0,1.0,Pc),
	((Pc =< Pcruz,!,
        cruzar(Ind1,Ind2,P1,P2,NInd1),
	  cruzar(Ind2,Ind1,P1,P2,NInd2))
	;(NInd1=Ind1,NInd2=Ind2)),
	cruzamento(Resto,Resto1).

preencheh([],[]).

preencheh([_|R1],[h|R2]):-
	preencheh(R1,R2).


sublista(L1,I1,I2,L):-
	I1 < I2,!,
	sublista1(L1,I1,I2,L).

sublista(L1,I1,I2,L):-
	sublista1(L1,I2,I1,L).

sublista1([X|R1],1,1,[X|H]):-!,
	preencheh(R1,H).

sublista1([X|R1],1,N2,[X|R2]):-!,
	N3 is N2 - 1,
	sublista1(R1,1,N3,R2).

sublista1([_|R1],N1,N2,[h|R2]):-
	N3 is N1 - 1,
	N4 is N2 - 1,
	sublista1(R1,N3,N4,R2).

rotate_right(L,K,L1):-
	tamanho_entrega(N),
	T is N - K,
	rr(T,L,L1).

rr(0,L,L):-!.

rr(N,[X|R],R2):-
	N1 is N - 1,
	append(R,[X],R1),
	rr(N1,R1,R2).


elimina([],_,[]):-!.

elimina([X|R1],L,[X|R2]):-
	not(member(X,L)),!,
	elimina(R1,L,R2).

elimina([_|R1],L,R2):-
	elimina(R1,L,R2).

insere([],L,_,L):-!.
insere([X|R],L,N,L2):-
	tamanho_entrega(T),
	((N>T,!,N1 is N mod T);N1 = N),
	insere1(X,N1,L,L1),
	N2 is N + 1,
	insere(R,L1,N2,L2).


insere1(X,1,L,[X|L]):-!.
insere1(X,N,[Y|L],[Y|L1]):-
	N1 is N-1,
	insere1(X,N1,L,L1).

cruzar(Ind1,Ind2,P1,P2,NInd11):-
	sublista(Ind1,P1,P2,Sub1),
	tamanho_entrega(NumT),
	R is NumT-P2,
	rotate_right(Ind2,R,Ind21),
	elimina(Ind21,Sub1,Sub2),
	P3 is P2 + 1,
	insere(Sub2,Sub1,P3,NInd1),
	eliminah(NInd1,NInd11).


eliminah([],[]).

eliminah([h|R1],R2):-!,
	eliminah(R1,R2).

eliminah([X|R1],[X|R2]):-
	eliminah(R1,R2).

mutacao([],[]).
mutacao([Ind|Rest],[NInd|Rest1]):-
	prob_mutacao(Pmut),
	random(0.0,1.0,Pm),
	((Pm < Pmut,!,mutacao1(Ind,NInd));NInd = Ind),
	mutacao(Rest,Rest1).

mutacao1(Ind,NInd):-
	gerar_pontos_cruzamento(P1,P2),
	mutacao22(Ind,P1,P2,NInd).

mutacao22([G1|Ind],1,P2,[G2|NInd]):-
	!, P21 is P2-1,
	mutacao23(G1,P21,Ind,G2,NInd).
mutacao22([G|Ind],P1,P2,[G|NInd]):-
	P11 is P1-1, P21 is P2-1,
	mutacao22(Ind,P11,P21,NInd).

mutacao23(G1,1,[G2|Ind],G2,[G1|Ind]):-!.
mutacao23(G1,P,[G|Ind],G2,[G|NInd]):-
	P1 is P-1,
	mutacao23(G1,P1,Ind,G2,NInd).


length_1([],0).
length_1([L|R],Length):-length_1(R,Length1),Length is Length1+1.



calculoNumeroCamioes(L_entrega,Number):-
		find_peso_total(L_entrega,Res),
		Aux is Res/4300,round(Aux,Aux1,1),
		floor(Aux1, Aux2),
		round(Aux1-Aux2,Aux3,1),Aux4 is Aux3*10,
		((Aux4<8,!,Number is Aux2+1);Number is Aux2+2).


createtruck_entrega(0).
createtruck_entrega(N):-assertz(truck_entrega(N,[])),N1 is N-1    ,createtruck_entrega(N1).

ordernarEntregas(Date,Lista_EntregaOrdenadas):-
            findall((M,IdEntrega),(entrega(X,Date,MassaEntrega,_,_,_),M is MassaEntrega,IdEntrega is X),Novos),
            sort(Novos,NovosOrd),
			reverse(NovosOrd,Lista_EntregaOrdenadas).


avalia_1(L_entrega,Res):-
    retractall(custo_maior_entrega(_)),
    assertz(custo_maior_entrega(0)),
	calculoNumeroCamioes(L_entrega,NumberCamiao),
	length_1(L_entrega,NumberEntregas),
	NumPerTruck is NumberEntregas//NumberCamiao,
	NumExtra is NumberEntregas mod NumberCamiao,
	calculoMaiorCaminhoEntreListaCaminhos(L_entrega,NumPerTruck,NumExtra),
	custo_maior_entrega(Res),!.


calculoMaiorCaminhoEntreListaCaminhos([],_,_).
calculoMaiorCaminhoEntreListaCaminhos(Lista_DaEntrega,NumPerTruck,NumExtra):-
	(NumExtra=0,!,NumExtra1 is NumExtra,N is NumPerTruck ;
	(N is NumPerTruck+1,NumExtra1 is NumExtra-1))
	,first_n(N, Lista_DaEntrega, FirstN,RemoveN),
	obterTempoEntrePercurso(FirstN,'eTruck01',R),atualiza1(R),
	calculoMaiorCaminhoEntreListaCaminhos(RemoveN,NumPerTruck,NumExtra1).

atualiza1(Res):-
  custo_maior_entrega(Resmax),
  ((Res>Resmax,!,retract(custo_maior_entrega(_)),assertz(custo_maior_entrega(Res)));true).

first_n(N, List, FirstN,RemoveN) :-
 split_list(N, List, FirstN,RemoveN).
    

% Define uma regra para dividir uma lista em duas partes
split_list(0, Rest, [], Rest).
split_list(N, [H|T], [H|Part1], Part2) :-
    N > 0,
    N1 is N - 1,
    split_list(N1, T, Part1, Part2).

	% Define uma lista de números
numbers([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).



concatena_primeiros_n(L, N, R) :-
  append(R, _, L), % Concatena os n primeiros elementos de L em R
  length(R, N),!. % Verifica se o tamanho de R é N


  remove_repetidos(L, R) :-
      sort(L, L1), % Ordena a lista L
      setof(X, member(X, L1), R).
	
	
associarCamioesListaEntregas(L_entrega,R):-
	calculoNumeroCamioes(L_entrega,NumberCamiao),
	length_1(L_entrega,NumberEntregas),
	NumPerTruck is NumberEntregas//NumberCamiao,
	NumExtra is NumberEntregas mod NumberCamiao,
	findall(X,carateristicasCam(X,_,_,_,_,_),L),
	associarCamioesListaEntregas2(L_entrega,L,NumPerTruck,NumExtra,[],R),!.
	

associarCamioesListaEntregas2([],_,_,_,R,Res):-Res = R.
associarCamioesListaEntregas2(Lista_DaEntrega,[Camiao|Resto],NumPerTruck,NumExtra,R,Res):-
	(NumExtra=0,!,NumExtra1 is NumExtra,N is NumPerTruck ;
	(N is NumPerTruck+1,NumExtra1 is NumExtra-1)),first_n(N, Lista_DaEntrega, FirstN,RemoveN),
	associarCamioesListaEntregas2(RemoveN,Resto,NumPerTruck,NumExtra1,[FirstN,Camiao|R],Res).