import { Component, Prop, h, Method, State, Element } from "@stencil/core";

@Component({
    tag: 'buddhilive-select',
    styleUrl: 'buddhilive-select.scss'
})

export class BuddhiliveSelect {
    @Prop() bltitle: string;
    @Prop() blname: string;
    @Prop() colorTheme: string = 'primary';

    @State() optionChange: boolean = false;

    option: Array<any> = [['hello', 'world'],['buddhi','kavindra']];
    blValue: String[] = ['buddhi', 'kavindra'];

    @Element() elemnt: HTMLElement;

    @Method()
    async setOptions(data) {
        for (let i = 0; data.length > i; i++) {
            this.option[i] = data[i];
        }
        this.optionChange = !this.optionChange;
    }

    @Method()
    setValues(values) {
        for (let i = 0; values.length > i; i++) {
            this.elemnt.querySelectorAll('option')[i].value = values[i];
        }
        this.optionChange = !this.optionChange;
    }

    @Method()
    async getValue() {
        let selectedValue = this.elemnt.getElementsByClassName('dropbtn')[0].innerHTML;
        return selectedValue;
    }

    @Method()
    toggleDropdown(elemnts, ev) {
        //var dropDown = elemnts.getElementById("bl-dropdown");
        //console.log(ev);
        if (ev.target.tagName == 'BUTTON') {
            var dropDown = elemnts.getElementsByClassName("dropdown-content");
            var btnToggle = elemnts.getElementsByClassName("dropbtn");
            dropDown[0].classList.toggle("show");
            btnToggle[0].classList.toggle("dropArrow");
        } if (ev.target.tagName == 'OPTION') {
            console.log(ev);
            elemnts.getElementsByClassName('dropbtn')[0].innerHTML = ev.target.innerHTML;
            elemnts.getElementsByClassName('value-holder')[0].value = ev.target.value;
            elemnts.getElementsByClassName("dropdown-content")[0].classList.remove('show');
        }
        //elemnts.getElementsByClassName('dropbtn')[0].innerHTML = 'done';
    }

    @Method()
    filterOptions(elemnts, ev) {
        if (ev.target.tagName == 'INPUT') {
            var input, filter, a, i;
            input = elemnts.getElementsByClassName("bl-input");
            filter = input[0].value.toUpperCase();
            var div = elemnts.getElementsByClassName("dropdown-content");
            a = div[0].getElementsByTagName("option");
            for (i = 0; i < a.length; i++) {
                var txtValue = a[i].textContent || a[i].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    a[i].style.display = "";
                } else {
                    a[i].style.display = "none";
                }
            }
        }
    }

    @Method()
    selectedItem(elements, ev) {
        if (ev.target.tagName == 'OPTION') {
            //console.log(ev.target);
            elements.getElementsByClassName('dropbtn')[0].innerHTML = ev.target.innerHTML;
            elements.getElementById('bl-dropdown').classList.remove('show');
        }
    }

    componentDidLoad() {
        this.elemnt.onclick = (ev => this.toggleDropdown(this.elemnt, ev));
        this.elemnt.onkeyup = (ev => this.filterOptions(this.elemnt, ev));
    }

    render() {
        return (
            <div class="bl-dropdown-wrapper" id={this.colorTheme}>
                <button type="button" class="dropbtn">{this.bltitle}</button>
                <div id="bl-dropdown" class="dropdown-content">
                    <input type="text" placeholder="Search.." class="bl-input" />
                    <input name={this.blname} type="text" class="value-holder"/>
                    {this.optionChange}
                    {this.option.map(optn => (
                        <option value={optn[1]}>{optn[0]}</option>
                    ))}
                </div>
            </div>
        )
    }
}