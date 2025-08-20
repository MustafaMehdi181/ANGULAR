import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';



interface Contact {                                       
  id: number;
  name: string;
  phone: string;
  email: string;
  gender: 'Male' | 'Female';
  address: string;
  groups: string[];
}

@Component({
  selector: 'app-left-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './left-panel.component.html',
  styleUrl: './left-panel.component.scss'
})

export class LeftPanelComponent {
 filters = ['All','Favourites','Family','Friends','Classmates']
  currentFilter: string = 'All'
  contacts: Contact[] = []
  filteredContacts: Contact[] = []
  selectedContact: Contact | null=null

  constructor(){
    this.generateMockContacts();
    this.applyFilter();
  }



 //functions that produce the mock data(taken from the internet)
  generateMockContacts(){
    const firstName = ['Ali','Rashid','Sharjeel','Awais','Rahim','Zohaib','John','Hamid','Kumail','Farkhanda']
    const lastName = ['Khokhar','Cheema','Hafeez','Jutt','Rana','Farzad','Paracha','Noman','Zakria','Tufail']
    const streets = ['St#1 JT', 'Walton Rd', 'Mall Rd', 'Fortress Rd', 'Jail Rd']
    const cities = ['Lahore', 'Karachi', 'Sargodha', 'Pindi', 'Mianwali']
    const groupsList = ['Favourites', 'Family', 'Friends', 'Classmates']
    const genders: ('Male' | 'Female')[] = ['Male', 'Female']

    for (let i = 1; i <= 50; i++) {
      const name = `${this.randomItem(firstName)} ${this.randomItem(lastName)}`;
      const phone = `+1-202-${this.pad(i)}-${this.pad(Math.floor(Math.random() * 10000))}`;
      const email = `${name.toLowerCase().replace(' ', '.')}@example.com`;
      const gender = this.randomItem(genders);
      const address = `${Math.floor(Math.random() * 999)} ${this.randomItem(streets)}, ${this.randomItem(cities)}`;
      const groups = this.shuffle(groupsList).slice(0, Math.floor(Math.random() * 3) + 1);

      this.contacts.push({ id: i, name, phone, email, gender, address, groups });
    }
  }

   randomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  
  pad(num: number): string {
    return num.toString().padStart(4, '0');
  }

  shuffle<T>(array: T[]): T[] {
    const a = array.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  applyFilter() {
    if (this.currentFilter === 'All') {
      this.filteredContacts = this.contacts;
    } else {
      this.filteredContacts = this.contacts.filter(c => c.groups.includes(this.currentFilter));
    }
    if (this.selectedContact && !this.filteredContacts.some(c => c.id === this.selectedContact!.id)) {
      this.selectedContact = null;
    }
  }

  onFilterClick(filter: string) {
    this.currentFilter = filter;
    this.applyFilter();
  }

  onSelectContact(contact: Contact) {
    this.selectedContact = contact;
  }

  toggleGroup(group: string) {
    if (!this.selectedContact) return;
    const idx = this.selectedContact.groups.indexOf(group);
    if (idx > -1) {
      this.selectedContact.groups.splice(idx, 1);
    } else {
      this.selectedContact.groups.push(group);
    }
    this.contacts = [...this.contacts];  
    this.applyFilter();
  }

  isInGroup(contact: Contact, group: string) {
    return contact.groups.includes(group);
  }
}
