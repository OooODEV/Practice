const pages = Array.from(document.getElementsByClassName("page"));
const navButtons = Array.from(document.getElementsByClassName("navBtn"));

navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => navigationChanged(e))
})

const navigationChanged = (e) => {
    const redirectPageId = e.target.dataset.redirectto;

    console.warn(redirectPageId);

    console.warn(pages);

    pages.forEach(page => {
        if (page.id !== redirectPageId) {
            page.classList.add('hidden');
        } else {
            page.classList.remove('hidden');
        }
    })
}

const getCryptos = () => {
    fetch('http://localhost:8080/api/crypto')
        .then(res => res.json())
        .then(data => {
            const cryptosWrapper = document.getElementById('cryptos-wrapper')

            data.cryptos.forEach(crypto => {
                const itemWrapper = document.createElement('div');
                itemWrapper.classList.add('market__crypto');

                // Name area

                const name = document.createElement('div');
                name.classList.add('market__crypto__category');
                const logo = document.createElement('img');
                logo.setAttribute('src', `./${crypto.path}`);
                logo.setAttribute('alt', `${crypto.name}`);

                //                                              Implement shortname in db if needed or delete 2 line below

                const shortName = document.createElement('p');
                shortName.classList.add('market__shortname');
                shortName.textContent = crypto.shortName;

                const longName = document.createElement('p');
                longName.classList.add('market__longname');
                longName.textContent = crypto.name;

                name.appendChild(logo);
                name.appendChild(shortName);
                name.appendChild(longName);

                itemWrapper.appendChild(name);

                // End of Name area

                // Price area

                const priceWrapper = document.createElement('div');
                priceWrapper.classList.add('market__crypto__category');
                const price = document.createElement('p');
                price.textContent = crypto.price;

                priceWrapper.appendChild(price);

                itemWrapper.appendChild(priceWrapper);

                // End of Price area

                // Change 24h area

                const changeWrapper = document.createElement('div');
                changeWrapper.classList.add('market__crypto__category');
                changeWrapper.classList.add('change');
                const change = document.createElement('p');

                if (crypto.change.includes('+')) {
                    change.classList.add('green');
                }
                if (crypto.change.includes('-')) {
                    change.classList.add('red');
                }

                change.textContent = crypto.change;

                changeWrapper.appendChild(change);

                itemWrapper.appendChild(changeWrapper);

                // End of Change 24h area

                // Amount area

                const amountWrapper = document.createElement('div');
                amountWrapper.classList.add('market__crypto__category');
                const amount = document.createElement('p');
                amount.textContent = crypto.amount;

                amountWrapper.appendChild(amount);

                itemWrapper.appendChild(amountWrapper);

                // End of Amount area

                // MarketCap area

                const capWrapper = document.createElement('div');
                capWrapper.classList.add('market__crypto__category');
                const cap = document.createElement('p');
                cap.textContent = crypto.capitalization;

                capWrapper.appendChild(cap);

                itemWrapper.appendChild(capWrapper);

                // End of MarketCap area

                cryptosWrapper.appendChild(itemWrapper);
            })
        })
}

getCryptos()


const initPages = () => {
    pages.forEach(page => {
        if (page.id !== 'main') {
            page.classList.add('hidden');
        } else {
            page.classList.remove('hidden');
        }
    })
}

initPages();