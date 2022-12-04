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
		
				
server(Port) :-						
        http_server(http_dispatch, [port(Port)]).


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
:-dynamic carateristicasCam/6.





%idArmazem(<local>,<codigo>)
idArmazem('Arouca',1).
idArmazem('Espinho',2).
idArmazem('Gondomar',3).
idArmazem('Maia',4).
idArmazem('Matosinhos',5).
idArmazem('Oliveira de Azemeis',6).
idArmazem('Paredes',7).
idArmazem('Porto',8).
idArmazem('Povoa de Varzim',9).
idArmazem('Santa Maria da Feira',10).
idArmazem('Santo Tirso',11).
idArmazem('Sao Joao da Madeira',12).
idArmazem('Trofa',13).
idArmazem('Vale de Cambra',14).
idArmazem('Valongo',15).
idArmazem('Vila do Conde',16).
idArmazem('Vila Nova de Gaia',17).


%entrega(<idEntrega>,<data>,<massaEntrefa>,<armazemEntrega>,<tempoColoc>,<tempoRet>)

entrega(4439,'20221205', 200, 1, 8, 10).
entrega(4438,'20221205', 150, 9, 7, 9).
entrega(4445,'20221205', 100, 3, 5, 7).



%carateristicasCam(<nome_camiao>,<tara>,<capacidade_carga>,<carga_total_baterias>,<autonomia>,<t_recarr_bat_20a80>).
carateristicasCam(eTruck01,7500,4300,80,80,60).

%dadosCam_t_e_ta(<nome_camiao>,<cidade_origem>,<cidade_destino>,<tempo>,<energia>,<tempo_adicional>).
dadosCam_t_e_ta(eTruck01,1,2,122,7,0).
dadosCam_t_e_ta(eTruck01,1,3,122,46,0).
dadosCam_t_e_ta(eTruck01,1,4,151,54,25).
dadosCam_t_e_ta(eTruck01,1,5,147,52,25).
dadosCam_t_e_ta(eTruck01,1,6,74,24,0).
dadosCam_t_e_ta(eTruck01,1,7,116,35,0).
dadosCam_t_e_ta(eTruck01,1,8,141,46,0).
dadosCam_t_e_ta(eTruck01,1,9,185,74,53).
dadosCam_t_e_ta(eTruck01,1,10,97,30,0).
dadosCam_t_e_ta(eTruck01,1,11,164,64,40).
dadosCam_t_e_ta(eTruck01,1,12,76,23,0).
dadosCam_t_e_ta(eTruck01,1,13,174,66,45).
dadosCam_t_e_ta(eTruck01,1,14,59,18,0).
dadosCam_t_e_ta(eTruck01,1,15,132,51,24).
dadosCam_t_e_ta(eTruck01,1,16,181,68,45).
dadosCam_t_e_ta(eTruck01,1,17,128,45,0).

dadosCam_t_e_ta(eTruck01,2,1,116,42,0).
dadosCam_t_e_ta(eTruck01,2,3,55,22,0).
dadosCam_t_e_ta(eTruck01,2,4,74,25,0).
dadosCam_t_e_ta(eTruck01,2,5,65,22,0).
dadosCam_t_e_ta(eTruck01,2,6,69,27,0).
dadosCam_t_e_ta(eTruck01,2,7,74,38,0).
dadosCam_t_e_ta(eTruck01,2,8,61,18,0).
dadosCam_t_e_ta(eTruck01,2,9,103,44,0).
dadosCam_t_e_ta(eTruck01,2,10,36,14,0).
dadosCam_t_e_ta(eTruck01,2,11,88,41,0).
dadosCam_t_e_ta(eTruck01,2,12,61,19,0).
dadosCam_t_e_ta(eTruck01,2,13,95,42,0).
dadosCam_t_e_ta(eTruck01,2,14,78,34,0).
dadosCam_t_e_ta(eTruck01,2,15,69,30,0).
dadosCam_t_e_ta(eTruck01,2,16,99,38,0).
dadosCam_t_e_ta(eTruck01,2,17,46,14,0).

dadosCam_t_e_ta(eTruck01,3,1,120,45,0).
dadosCam_t_e_ta(eTruck01,3,2,50,22,0).
dadosCam_t_e_ta(eTruck01,3,4,46,15,0).
dadosCam_t_e_ta(eTruck01,3,5,46,14,0).
dadosCam_t_e_ta(eTruck01,3,6,74,37,0).
dadosCam_t_e_ta(eTruck01,3,7,63,23,0).
dadosCam_t_e_ta(eTruck01,3,8,38,8,0).
dadosCam_t_e_ta(eTruck01,3,9,84,36,0).
dadosCam_t_e_ta(eTruck01,3,10,59,28,0).
dadosCam_t_e_ta(eTruck01,3,11,61,27,0).
dadosCam_t_e_ta(eTruck01,3,12,67,32,0).
dadosCam_t_e_ta(eTruck01,3,13,67,29,0).
dadosCam_t_e_ta(eTruck01,3,14,82,38,0).
dadosCam_t_e_ta(eTruck01,3,15,34,8,0).
dadosCam_t_e_ta(eTruck01,3,16,80,30,0).
dadosCam_t_e_ta(eTruck01,3,17,36,10,0).

dadosCam_t_e_ta(eTruck01,4,1,149,54,25).
dadosCam_t_e_ta(eTruck01,4,2,65,24,0).
dadosCam_t_e_ta(eTruck01,4,3,46,16,0).
dadosCam_t_e_ta(eTruck01,4,5,27,10,0).
dadosCam_t_e_ta(eTruck01,4,6,103,47,0).
dadosCam_t_e_ta(eTruck01,4,7,55,27,0).
dadosCam_t_e_ta(eTruck01,4,8,36,10,0).
dadosCam_t_e_ta(eTruck01,4,9,50,26,0).
dadosCam_t_e_ta(eTruck01,4,10,78,34,0).
dadosCam_t_e_ta(eTruck01,4,11,42,19,0).
dadosCam_t_e_ta(eTruck01,4,12,97,42,0).
dadosCam_t_e_ta(eTruck01,4,13,44,11,0).
dadosCam_t_e_ta(eTruck01,4,14,111,48,0).
dadosCam_t_e_ta(eTruck01,4,15,32,13,0).
dadosCam_t_e_ta(eTruck01,4,16,53,14,0).
dadosCam_t_e_ta(eTruck01,4,17,38,11,0).

dadosCam_t_e_ta(eTruck01,5,1,141,51,24).
dadosCam_t_e_ta(eTruck01,5,2,55,20,0).
dadosCam_t_e_ta(eTruck01,5,3,48,14,0).
dadosCam_t_e_ta(eTruck01,5,4,25,9,0).
dadosCam_t_e_ta(eTruck01,5,6,97,44,0).
dadosCam_t_e_ta(eTruck01,5,7,55,28,0).
dadosCam_t_e_ta(eTruck01,5,8,29,7,0).
dadosCam_t_e_ta(eTruck01,5,9,48,24,0).
dadosCam_t_e_ta(eTruck01,5,10,69,30,0).
dadosCam_t_e_ta(eTruck01,5,11,53,26,0).
dadosCam_t_e_ta(eTruck01,5,12,95,36,0).
dadosCam_t_e_ta(eTruck01,5,13,63,20,0).
dadosCam_t_e_ta(eTruck01,5,14,105,45,0).
dadosCam_t_e_ta(eTruck01,5,15,34,14,0).
dadosCam_t_e_ta(eTruck01,5,16,46,18,0).
dadosCam_t_e_ta(eTruck01,5,17,27,7,0).

dadosCam_t_e_ta(eTruck01,6,1,69,23,0).
dadosCam_t_e_ta(eTruck01,6,2,71,27,0).
dadosCam_t_e_ta(eTruck01,6,3,74,38,0).
dadosCam_t_e_ta(eTruck01,6,4,103,46,0).
dadosCam_t_e_ta(eTruck01,6,5,99,44,0).
dadosCam_t_e_ta(eTruck01,6,7,88,48,0).
dadosCam_t_e_ta(eTruck01,6,8,92,38,0).
dadosCam_t_e_ta(eTruck01,6,9,134,66,45).
dadosCam_t_e_ta(eTruck01,6,10,42,14,0).
dadosCam_t_e_ta(eTruck01,6,11,116,56,30).
dadosCam_t_e_ta(eTruck01,6,12,23,9,0).
dadosCam_t_e_ta(eTruck01,6,13,126,58,33).
dadosCam_t_e_ta(eTruck01,6,14,25,9,0).
dadosCam_t_e_ta(eTruck01,6,15,84,44,0).
dadosCam_t_e_ta(eTruck01,6,16,132,60,35).
dadosCam_t_e_ta(eTruck01,6,17,80,38,0).

dadosCam_t_e_ta(eTruck01,7,1,116,36,0).
dadosCam_t_e_ta(eTruck01,7,2,71,38,0).
dadosCam_t_e_ta(eTruck01,7,3,61,22,0).
dadosCam_t_e_ta(eTruck01,7,4,53,26,0).
dadosCam_t_e_ta(eTruck01,7,5,53,28,0).
dadosCam_t_e_ta(eTruck01,7,6,88,48,0).
dadosCam_t_e_ta(eTruck01,7,8,59,26,0).
dadosCam_t_e_ta(eTruck01,7,9,88,48,0).
dadosCam_t_e_ta(eTruck01,7,10,84,44,0).
dadosCam_t_e_ta(eTruck01,7,11,74,22,0).
dadosCam_t_e_ta(eTruck01,7,12,82,42,0).
dadosCam_t_e_ta(eTruck01,7,13,76,31,0).
dadosCam_t_e_ta(eTruck01,7,14,97,49,21).
dadosCam_t_e_ta(eTruck01,7,15,29,16,0).
dadosCam_t_e_ta(eTruck01,7,16,84,42,0).
dadosCam_t_e_ta(eTruck01,7,17,69,30,0).

dadosCam_t_e_ta(eTruck01,8,1,134,46,0).
dadosCam_t_e_ta(eTruck01,8,2,59,18,0).
dadosCam_t_e_ta(eTruck01,8,3,32,6,0).
dadosCam_t_e_ta(eTruck01,8,4,34,10,0).
dadosCam_t_e_ta(eTruck01,8,5,32,7,0).
dadosCam_t_e_ta(eTruck01,8,6,88,38,0).
dadosCam_t_e_ta(eTruck01,8,7,57,26,0).
dadosCam_t_e_ta(eTruck01,8,9,69,30,0).
dadosCam_t_e_ta(eTruck01,8,10,65,26,0).
dadosCam_t_e_ta(eTruck01,8,11,53,22,0).
dadosCam_t_e_ta(eTruck01,8,12,82,34,0).
dadosCam_t_e_ta(eTruck01,8,13,61,24,0).
dadosCam_t_e_ta(eTruck01,8,14,97,40,0).
dadosCam_t_e_ta(eTruck01,8,15,36,12,0).
dadosCam_t_e_ta(eTruck01,8,16,65,23,0).
dadosCam_t_e_ta(eTruck01,8,17,32,6,0).

dadosCam_t_e_ta(eTruck01,9,1,181,72,50).
dadosCam_t_e_ta(eTruck01,9,2,95,41,0).
dadosCam_t_e_ta(eTruck01,9,3,86,35,0).
dadosCam_t_e_ta(eTruck01,9,4,55,24,0).
dadosCam_t_e_ta(eTruck01,9,5,48,23,0).
dadosCam_t_e_ta(eTruck01,9,6,134,65,42).
dadosCam_t_e_ta(eTruck01,9,7,95,47,0).
dadosCam_t_e_ta(eTruck01,9,8,69,28,0).
dadosCam_t_e_ta(eTruck01,9,10,109,51,24).
dadosCam_t_e_ta(eTruck01,9,11,61,29,0).
dadosCam_t_e_ta(eTruck01,9,12,132,57,31).
dadosCam_t_e_ta(eTruck01,9,13,67,19,0).
dadosCam_t_e_ta(eTruck01,9,14,143,66,45).
dadosCam_t_e_ta(eTruck01,9,15,71,34,0).
dadosCam_t_e_ta(eTruck01,9,16,15,3,0).
dadosCam_t_e_ta(eTruck01,9,17,67,28,0).

dadosCam_t_e_ta(eTruck01,10,1,97,30,0).
dadosCam_t_e_ta(eTruck01,10,2,34,14,0).
dadosCam_t_e_ta(eTruck01,10,3,59,27,0).
dadosCam_t_e_ta(eTruck01,10,4,78,33,0).
dadosCam_t_e_ta(eTruck01,10,5,71,30,0).
dadosCam_t_e_ta(eTruck01,10,6,40,14,0).
dadosCam_t_e_ta(eTruck01,10,7,82,42,0).
dadosCam_t_e_ta(eTruck01,10,8,65,24,0).
dadosCam_t_e_ta(eTruck01,10,9,109,52,25).
dadosCam_t_e_ta(eTruck01,10,11,92,46,0).
dadosCam_t_e_ta(eTruck01,10,12,32,6,0).
dadosCam_t_e_ta(eTruck01,10,13,99,46,0).
dadosCam_t_e_ta(eTruck01,10,14,63,17,0).
dadosCam_t_e_ta(eTruck01,10,15,74,34,0).
dadosCam_t_e_ta(eTruck01,10,16,105,46,0).
dadosCam_t_e_ta(eTruck01,10,17,53,23,0).

dadosCam_t_e_ta(eTruck01,11,1,164,65,42).
dadosCam_t_e_ta(eTruck01,11,2,88,41,0).
dadosCam_t_e_ta(eTruck01,11,3,65,28,0).
dadosCam_t_e_ta(eTruck01,11,4,42,18,0).
dadosCam_t_e_ta(eTruck01,11,5,55,25,0).
dadosCam_t_e_ta(eTruck01,11,6,118,57,31).
dadosCam_t_e_ta(eTruck01,11,7,74,23,0).
dadosCam_t_e_ta(eTruck01,11,8,59,23,0).
dadosCam_t_e_ta(eTruck01,11,9,63,28,0).
dadosCam_t_e_ta(eTruck01,11,10,97,46,0).
dadosCam_t_e_ta(eTruck01,11,12,111,52,25).
dadosCam_t_e_ta(eTruck01,11,13,25,7,0).
dadosCam_t_e_ta(eTruck01,11,14,126,58,33).
dadosCam_t_e_ta(eTruck01,11,15,53,25,0).
dadosCam_t_e_ta(eTruck01,11,16,59,27,0).
dadosCam_t_e_ta(eTruck01,11,17,67,27,0).

dadosCam_t_e_ta(eTruck01,12,1,76,23,0).
dadosCam_t_e_ta(eTruck01,12,2,61,19,0).
dadosCam_t_e_ta(eTruck01,12,3,67,32,0).
dadosCam_t_e_ta(eTruck01,12,4,97,41,0).
dadosCam_t_e_ta(eTruck01,12,5,92,38,0).
dadosCam_t_e_ta(eTruck01,12,6,19,8,0).
dadosCam_t_e_ta(eTruck01,12,7,82,42,0).
dadosCam_t_e_ta(eTruck01,12,8,86,33,0).
dadosCam_t_e_ta(eTruck01,12,9,128,61,37).
dadosCam_t_e_ta(eTruck01,12,10,32,6,0).
dadosCam_t_e_ta(eTruck01,12,11,109,50,23).
dadosCam_t_e_ta(eTruck01,12,13,120,53,26).
dadosCam_t_e_ta(eTruck01,12,14,40,10,0).
dadosCam_t_e_ta(eTruck01,12,15,78,38,0).
dadosCam_t_e_ta(eTruck01,12,16,126,54,28).
dadosCam_t_e_ta(eTruck01,12,17,74,32,0).

dadosCam_t_e_ta(eTruck01,13,1,174,65,42).
dadosCam_t_e_ta(eTruck01,13,2,107,35,0).
dadosCam_t_e_ta(eTruck01,13,3,74,29,0).
dadosCam_t_e_ta(eTruck01,13,4,46,11,0).
dadosCam_t_e_ta(eTruck01,13,5,67,20,0).
dadosCam_t_e_ta(eTruck01,13,6,128,57,31).
dadosCam_t_e_ta(eTruck01,13,7,80,30,0).
dadosCam_t_e_ta(eTruck01,13,8,76,20,0).
dadosCam_t_e_ta(eTruck01,13,9,67,20,0).
dadosCam_t_e_ta(eTruck01,13,10,105,47,0).
dadosCam_t_e_ta(eTruck01,13,11,27,7,0).
dadosCam_t_e_ta(eTruck01,13,12,122,52,25).
dadosCam_t_e_ta(eTruck01,13,14,137,58,33).
dadosCam_t_e_ta(eTruck01,13,15,67,17,0).
dadosCam_t_e_ta(eTruck01,13,16,59,15,0).
dadosCam_t_e_ta(eTruck01,13,17,78,22,0).

dadosCam_t_e_ta(eTruck01,14,1,59,18,0).
dadosCam_t_e_ta(eTruck01,14,2,80,35,0).
dadosCam_t_e_ta(eTruck01,14,3,80,38,0).
dadosCam_t_e_ta(eTruck01,14,4,109,46,0).
dadosCam_t_e_ta(eTruck01,14,5,105,45,0).
dadosCam_t_e_ta(eTruck01,14,6,27,9,0).
dadosCam_t_e_ta(eTruck01,14,7,97,48,0).
dadosCam_t_e_ta(eTruck01,14,8,99,38,0).
dadosCam_t_e_ta(eTruck01,14,9,143,66,45).
dadosCam_t_e_ta(eTruck01,14,10,61,17,0).
dadosCam_t_e_ta(eTruck01,14,11,122,57,31).
dadosCam_t_e_ta(eTruck01,14,12,42,10,0).
dadosCam_t_e_ta(eTruck01,14,13,132,58,35).
dadosCam_t_e_ta(eTruck01,14,15,90,44,0).
dadosCam_t_e_ta(eTruck01,14,16,139,61,37).
dadosCam_t_e_ta(eTruck01,14,17,86,38,0).

dadosCam_t_e_ta(eTruck01,15,1,132,51,24).
dadosCam_t_e_ta(eTruck01,15,2,74,30,0).
dadosCam_t_e_ta(eTruck01,15,3,34,8,0).
dadosCam_t_e_ta(eTruck01,15,4,36,12,0).
dadosCam_t_e_ta(eTruck01,15,5,36,14,0).
dadosCam_t_e_ta(eTruck01,15,6,86,44,0).
dadosCam_t_e_ta(eTruck01,15,7,34,16,0).
dadosCam_t_e_ta(eTruck01,15,8,42,13,0).
dadosCam_t_e_ta(eTruck01,15,9,71,35,0).
dadosCam_t_e_ta(eTruck01,15,10,82,36,0).
dadosCam_t_e_ta(eTruck01,15,11,53,25,0).
dadosCam_t_e_ta(eTruck01,15,12,80,38,0).
dadosCam_t_e_ta(eTruck01,15,13,69,18,0).
dadosCam_t_e_ta(eTruck01,15,14,95,45,0).
dadosCam_t_e_ta(eTruck01,15,16,69,29,0).
dadosCam_t_e_ta(eTruck01,15,17,53,17,0).

dadosCam_t_e_ta(eTruck01,16,1,179,68,45).
dadosCam_t_e_ta(eTruck01,16,2,92,37,0).
dadosCam_t_e_ta(eTruck01,16,3,84,31,0).
dadosCam_t_e_ta(eTruck01,16,4,57,16,0).
dadosCam_t_e_ta(eTruck01,16,5,46,18,0).
dadosCam_t_e_ta(eTruck01,16,6,132,60,35).
dadosCam_t_e_ta(eTruck01,16,7,92,42,0).
dadosCam_t_e_ta(eTruck01,16,8,67,23,0).
dadosCam_t_e_ta(eTruck01,16,9,15,3,0).
dadosCam_t_e_ta(eTruck01,16,10,105,46,0).
dadosCam_t_e_ta(eTruck01,16,11,57,28,0).
dadosCam_t_e_ta(eTruck01,16,12,130,52,25).
dadosCam_t_e_ta(eTruck01,16,13,61,15,0).
dadosCam_t_e_ta(eTruck01,16,14,141,61,37).
dadosCam_t_e_ta(eTruck01,16,15,69,29,0).
dadosCam_t_e_ta(eTruck01,16,17,65,24,0).

dadosCam_t_e_ta(eTruck01,17,1,128,46,0).
dadosCam_t_e_ta(eTruck01,17,2,42,14,0).
dadosCam_t_e_ta(eTruck01,17,3,40,11,0).
dadosCam_t_e_ta(eTruck01,17,4,42,13,0).
dadosCam_t_e_ta(eTruck01,17,5,34,10,0).
dadosCam_t_e_ta(eTruck01,17,6,82,38,0).
dadosCam_t_e_ta(eTruck01,17,7,74,30,0).
dadosCam_t_e_ta(eTruck01,17,8,29,6,0).
dadosCam_t_e_ta(eTruck01,17,9,69,31,0).
dadosCam_t_e_ta(eTruck01,17,10,55,24,0).
dadosCam_t_e_ta(eTruck01,17,11,69,29,0).
dadosCam_t_e_ta(eTruck01,17,12,80,30,0).
dadosCam_t_e_ta(eTruck01,17,13,82,23,0).
dadosCam_t_e_ta(eTruck01,17,14,90,38,0).
dadosCam_t_e_ta(eTruck01,17,15,53,18,0).
dadosCam_t_e_ta(eTruck01,17,16,67,25,0).



%-----------------------------------------------------

obterIdArmazemDaEntrega(Date,L):- findall(X,entrega(_,Date,_,X,_,_),L).

%-----------------------------------------------------

obterTodosOsCaminhos(Plate,Date,L):-obterIdArmazemDaEntrega(Plate,Date,R),findall(LP, permutation(R,LP), L).

%----------------------------------------------------
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
            entrega(IdEntrega,_,Massa_carga,ArmazemEntrega,_,Tempo_ret),entrega(IdEntrega2,_,_,ArmazemEntrega2,_,_),
            obterTempoEntreDoisArmazens(Orig,ArmazemEntrega,Plate,Peso,X),Peso_Camiao_Atualizado is (Peso-Massa_carga),
            obterTempoDentroDoArmazem(ArmazemEntrega,ArmazemEntrega2,Plate,Tempo_ret,Peso_Camiao_Atualizado,T_no_Armazem),
            obterTempoEntrePercurso2([IdEntrega2|Z],ArmazemEntrega,Plate,Peso_Camiao_Atualizado,Res1),
            Res is Res1+X+T_no_Armazem,!.

%-----------------------------------------------------


%DESCOBRIR PESO DE UM CAMIAO ATRAVES DE uma lista de entregas 
find_peso_total([],0).
find_peso_total([L|R],Res):-find_peso_total(R,Res1),entrega(L,_,Aux,_,_,_), Res is Res1 + Aux.





obterTempoEntreDoisArmazens(A1,A2,Plate,Peso_Camiao,Tempo_percurso):-
      carateristicasCam(Plate,Tara,Capacidade_carga,Carga_total_baterias,Autonomia,T_recarr_bat_20a80),
      Peso_Camiao_max is Tara+Capacidade_carga,dadosCam_t_e_ta(Plate,A1,A2,Tempo,Energia,Tempo_adicional),
      round(Peso_Camiao*Tempo/Peso_Camiao_max,Aux,2),Tempo_percurso is Aux+Tempo_adicional,
      round(Peso_Camiao*Energia/Peso_Camiao_max,Energia_Gasta,2),
          Autonomia_atualizada is (Autonomia-Energia_Gasta),

      retractall(carateristicasCam(Plate,_,_,_,_,_)),
      assertz(carateristicasCam(Plate,Tara,Capacidade_carga,Carga_total_baterias,(Autonomia_atualizada),T_recarr_bat_20a80)).
     


obterTempoDentroDoArmazem(Orig,Dest,Plate,Tempo_ret,Peso_Camiao,Res):-
      carateristicasCam(Plate,Tara,Capacidade_carga,Carga_total_baterias,Autonomia,T_recarr_bat_20a80),
      Peso_Camiao_max is Tara+Capacidade_carga,
      dadosCam_t_e_ta(Plate,Orig,Dest,_,Energia,_),
      round(Peso_Camiao*Energia/Peso_Camiao_max,Energia_Gasta,2),
      ((Autonomia-Energia_Gasta<20,!,Perc_Carre is 80-Autonomia,round(T_recarr_bat_20a80*Perc_Carre/60,T_recarr,2),
      (T_recarr<Tempo_ret,!,(Res is Tempo_ret);Res is T_recarr),
      retractall(carateristicasCam(Plate,_,_,_,_,_)),
      assertz(carateristicasCam(Plate,Tara,Capacidade_carga,Carga_total_baterias,80,T_recarr_bat_20a80))
      );Res is Tempo_ret).

                   
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

%-----------------------------------------------------
round(X,Y,D) :- Z is X * 10^D, round(Z, ZA), Y is ZA / 10^D.


         
  bestfsTime(Plate,Date,Cam,Tempo):-
      findall(X,entrega(X,Date,_,_,_,_),L_entrega),
      bestfsTime2(Plate,5,[],L_entrega,Cam), 
      carateristicasCam(Plate,Tare,_,_,_,_),
      find_peso_total(Cam,Peso_carga),Peso is Tare+Peso_carga,
      obterTempoEntrePercurso(Cam,5,Plate,Peso,Tempo),!.


bestfsTime2(Plate,Orig,L_Aux,Lista_Entrega,Cam):-
      findall((Res,IdEntrega,NextIdArmazem),(entrega(X,_,_,IdArmazem,_,_),\+member(X,L_Aux),dadosCam_t_e_ta(Plate,Orig,NextIdArmazem,Tempo,_,Tempo_adicional),IdEntrega is X,NextIdArmazem is IdArmazem,Res is Tempo+Tempo_adicional),Novos),
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
findall((M,IdEntrega,NextIdArmazem),(entrega(X,_,MassaEntrega,IdArmazem,_,_),\+member(X,L_Aux),dadosCam_t_e_ta(Plate,Orig,NextIdArmazem,Tempo,_,Tempo_adicional),Res is Tempo+Tempo_adicional,M is MassaEntrega*Res,IdEntrega is X,NextIdArmazem is IdArmazem),Novos),
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