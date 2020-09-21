function start(){

    fetch('https://api.dicionario-aberto.net/random')
    .then(res => res.json())
    .then(random => {

        const wordName = document.getElementById('wordName')
        const senseCount = document.getElementById('senseCount')
        const signif = document.getElementById('signif')
        const rButton = document.getElementById('rButton')
        const searchDiv = document.getElementById('searchDiv')
        const usageH2 = document.getElementById('usageH2')

        searchDiv.hidden = true

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

            signif.hidden = false

            const div = document.getElementById('response')
            div.innerHTML = xml

            usageArray = ['Hoje eu tive um dia ', 'Meu irmão é ', 'Ontem meu cachorro estava ', 'Minha casa é ', 'Minha mãe é ', 'Meu pai é ', 'Ontem eu fui no cinema, mas me senti um pouco ', 'Meu amigo me disse que eu deveria me sentir mais ']

            const randomUsage = usageArray[Math.floor(Math.random() * usageArray.length)];

            usageH2.innerHTML = `${randomUsage} ${word}`

            usageH2.hidden = false
        })
    })
}

function suffix(){

    const suffixValue = document.getElementById('searchInput').value

    fetch(`https://api.dicionario-aberto.net/suffix/${suffixValue}`)
    .then(res => res.json())
    .then(suff => {

        const suffixRes = document.getElementById('suffixRes')

        console.log(suff)
        
        var str = '<ul>'
        
        suff.forEach(function(objects) {
            str += '<li>'+ objects + '</li>';
        });

        document.getElementById("suffixRes").innerHTML = str;
    })
}