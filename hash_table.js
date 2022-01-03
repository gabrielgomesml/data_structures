class OpenedHashTable {
    constructor(size = 11, func = null) {
        this.buckets = new Array(size).fill(null);
        this.size = size;
        this.fill = 0
        if (!func) {
            this.hash = (key) => {return key.toString().length % size};
        } else {
            this.hash = func
        };
    };

    add(value) {
        let i = this.hash(value);
        while (this.fill != this.size) {
            if (!this.buckets[i]) {
                this.buckets[i] = value
                this.fill++
                return
            }
            if (i == this.size - 1) {
                i = 0
            } else {
                i++
            }
        }
        console.log("The table is full!")
        return
    };

    remove(value) {
        if (this.search(value) != -1) {
            this.buckets[this.search(value)] = null;
        };
    };

    search(value) {
       let aux = 0;
       let i = this.hash(value);

       while (aux != this.size) {
           if (this.buckets[i] == value) {
               return i;
           }
           if (i == this.size - 1) {
               i = 0;
           } else {
               i++;
           }
           aux++;
       }
       console.log("The value is not in the table!");
       return -1;
    }

    get(index) {
        if (index >= this.size) {
            console.log("Index out of range!");
            return -1;
        } else {
            console.log(this.buckets[index])
            return this.buckets[index];
        };
    };
};

class ClosedHashTable extends OpenedHashTable {
    constructor(size = 11, func = null) {
        super(size, func);
    };

    add(value) {
        let i = this.hash(value);
        if (!this.buckets[i]) {
            this.buckets[i] = [];
        };
        this.buckets[i].push(value);
    };

    search(value) {
        let i = this.hash(value);
        if (!this.buckets[i]) {
            console.log("The value is not in the table!");
            return -1;
        };
        for (let aux = 0; aux < this.buckets[i].length; aux++) {
            if (this.buckets[i][aux] == value) {
                return [i, aux];
            }
        }
        console.log("The value is not in the table!");
        return -1;
    }

    remove(value) {
        let i = this.hash(value);
        let pos = this.search(value)
        if (pos != -1) {
            if (this.buckets[i].length == 1) {
                this.buckets[i] = null;
            } else {
                this.buckets[i].splice(pos[1], 1)
            };
        };
    };
}

// Tabela de endereçamento aberto
console.log('_____________________________');
console.log('Tabela de endereçamento aberto');

openedTable = new OpenedHashTable();

console.log('_____________________________');
console.log(openedTable.buckets);

openedTable.add('a');
openedTable.add('eu');
openedTable.add('tu');
openedTable.add('oi');
openedTable.add('olá');
openedTable.add('gabriel');
openedTable.add('gomes');
openedTable.add('de');
openedTable.add('melo');

console.log('_____________________________');
console.log(openedTable.buckets);

openedTable.remove('tu');

console.log('_____________________________');
openedTable.remove('vi');

console.log('_____________________________');
console.log(openedTable.buckets);


// Tabela de endereçamento fechado
console.log('_____________________________');
console.log('Tabela de endereçamento fechado');

closedTable = new ClosedHashTable();

console.log('_____________________________');
console.log(closedTable.buckets);

closedTable.add('a');
closedTable.add('eu');
closedTable.add('tu');
closedTable.add('oi');
closedTable.add('olá');
closedTable.add('gabriel');
closedTable.add('gomes');
closedTable.add('de');
closedTable.add('melo');

console.log('_____________________________');
console.log(closedTable.buckets);

closedTable.remove('tu');

console.log('_____________________________');
closedTable.remove('vi');

console.log('_____________________________');
console.log(closedTable.buckets);
