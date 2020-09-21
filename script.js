function start(){

    fetch('https://api.dicionario-aberto.net/random')
    .then(res => res.json())
    .then(random => {

        const wordName = document.getElementById('wordName')
        const senseCount = document.getElementById('senseCount')
        const signif = document.getElementById('signif')
        const rButton = document.getElementById('rButton')
        const searchDiv = document.getElementById('searchDiv')
        const searchSenseDiv = document.getElementById('searchSenseDiv')
        // const usageH2 = document.getElementById('usageH2')

        searchDiv.hidden = true
        searchSenseDiv.hidden = true

        const word = random.word
        const sense = random.sense

        console.log(random)

        wordName.hidden = false
        wordName.innerHTML =`Palavra: ${word}`

        senseCount.hidden = false
        senseCount.innerHTML = "Total de sentidos: " + sense

        fetch(`https://api.dicionario-aberto.net/word/${word}/${sense}`)
        .then(res => res.json())
        .then(wordData => {
            console.log(wordData)

            const xml = wordData[0].xml

            var newxml = xml.replace(/_/g, "<em>")

            signif.hidden = false

            const div = document.getElementById('response')
            div.innerHTML = newxml

            usageArray = ['Hoje eu tive um dia ', 'Meu irmão é ', 'Ontem meu cachorro estava ', 'Minha casa é ', 'Minha mãe é ', 'Meu pai é ', 'Ontem eu fui no cinema, mas me senti um pouco ', 'Meu amigo me disse que eu deveria me sentir mais ']

            const randomUsage = usageArray[Math.floor(Math.random() * usageArray.length)];

            // usageH2.innerHTML = `${randomUsage} ${word}`

            // usageH2.hidden = false
        })
    })
}

function suffix(){

    const suffixValue = document.getElementById('searchInput').value

    document.getElementById('generateDiv').hidden = true
    document.getElementById('searchSenseDiv').hidden = true

    document.getElementById('desmontrateButton').hidden = true

    fetch(`https://api.dicionario-aberto.net/suffix/${suffixValue}`)
    .then(res => res.json())
    .then(suff => {

        const suffixRes = document.getElementById('suffixRes')

        console.log(suff)
        
        var str = '<ul>'
        
        suff.forEach(function(objects) {
            str += '<li>'+ JSON.stringify(objects.word) + '</li>';
        });

        document.getElementById("suffixRes").innerHTML = str;
    })
}

function demonstrate(){
    document.getElementById('searchInput').value = 'canas'

    document.getElementById('generateDiv').hidden = true
    document.getElementById('searchSenseDiv').hidden = true

    fetch(`https://api.dicionario-aberto.net/suffix/canas`)
    .then(res => res.json())
    .then(suff => {
        const suffixRes = document.getElementById('suffixRes')

        document.getElementById('desmontrateButton').hidden = true

        console.log(suff)
        
        var str = '<ul>'
        
        suff.forEach(function(objects) {
            str += '<li>'+ JSON.stringify(objects.word) + '</li>';
        });

        document.getElementById("suffixRes").innerHTML = str;
    })
}

function senseSearch() {
    word = document.getElementById('searchSense').value

    document.getElementById('searchDiv').hidden = true
    document.getElementById('generateDiv').hidden = true

    document.getElementById('desmontrateButtonS').hidden = true

    fetch(`https://api.dicionario-aberto.net/word/${word}`)
    .then(res => res.json())
    .then(search => {
        console.log(search)
        console.log(search[0])

        const xml = search[0].xml

        var newxml = xml.replace(/_/g, "<em>")

        const div = document.getElementById('senseSpace')
        div.innerHTML = newxml
    })
}

function demonstrateSense() {
    word = document.getElementById('searchSense').value = 'cavalo'

    document.getElementById('searchDiv').hidden = true
    document.getElementById('generateDiv').hidden = true

    fetch(`https://api.dicionario-aberto.net/word/cavalo`)
    .then(res => res.json())
    .then(search => {
        console.log(search)
        console.log(search[0])

        const xml = search[0].xml

        var newxml = xml.replace(/_/g, "<em>")

        const div = document.getElementById('senseSpace')
        div.innerHTML = newxml
    })
}