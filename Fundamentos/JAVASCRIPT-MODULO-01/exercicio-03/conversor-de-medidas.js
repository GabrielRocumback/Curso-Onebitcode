let valor = parseFloat(prompt('Digite um valor em metrôs:'))

const unidadeMedida = prompt('Escolha uma das seguintes opções de conversão:'
+'\n1-milímetro (mm)'
+'\n2-centímetro (cm)'
+'\n3-decímetro (dm)'
+'\n4-decâmetro (dam)'
+'\n5-hectômetro (hm)'
+'\n6-quilômetro (km)')


switch(unidadeMedida) {
    case '1':
        valor = valor * 1000
        alert('O resultado da conversão é '+ valor +'')
        break
    case '2':
        valor = valor * 100
        alert('O resultado da conversão é '+ valor +'')
        break
    case '3':
        valor = valor * 10
        alert('O resultado da conversão é '+ valor +'')
        break
    case '4':
        valor = valor / 10
        alert('O resultado da conversão é '+ valor +'')
        break
    case '5':
        valor = valor / 100
        alert('O resultado da conversão é '+ valor +'')
        break
    case '6':
        valor = valor / 1000
        alert('O resultado da conversão é '+ valor +'')
        break
    default:
        alert('Opção inválida')
        break
}