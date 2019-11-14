import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editprovee',
  templateUrl: './editprovee.component.html',
  styleUrls: ['./editprovee.component.css']
})
export class EditproveeComponent implements OnInit {
  @ViewChild('proveedorForm', { static: true }) proveedorForm: FormGroup;
  presupuestoForm: FormGroup;
  id: string;
  nombre: string;
  cif: string;
  direccion: string;
  cp: number;
  localidad: string;
  provincia: string;
  telefono: number;
  email: string;
  contacto: string;

  proveedor: any = {
    nombre: '',
    cif: '',
    direccion: '',
    cp: 0,
    localidad: '',
    provincia: '',
    telefono: null,
    email: '',
    contacto: ''
  };
  provincias: string[] = ['Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila',
  'Badajoz', 'Barcelona', 'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba',
  'La Coruña', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara', 'Guipúzcoa', 'Huelva', 'Huesca', 'IslasBaleares',
  'Jaén', 'León', 'Lérida', 'Lugo', 'Madrid', 'Málaga', 'Murcia', 'Navarra', 'Orense', 'Palencia', 'Las Palmas',
  'Pontevedra', 'La Rioja', 'Salamanca', 'Segovia', 'Sevilla', 'Soria', 'Tarragona', 'Santa Cruz de Tenerife',
  'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza']

  constructor(private pf: FormBuilder, private proveedorService: ProveedoresService, private router: Router, private activatedRouter: ActivatedRoute) {
    this.activatedRouter.params.subscribe(parametros => {
      this.id = parametros['id'];
      this.proveedorService.getProveedor(this.id)
        .subscribe(proveedor => this.proveedor = proveedor)
    });
  }

  ngOnInit() {
    this.proveedorForm = this.pf.group({
      nombre: ['', Validators.required],
      cif: ['', Validators.required],
      direccion: ['', [Validators.required, Validators.minLength(10)]],
      cp: [0, Validators.required],
      localidad: ['', Validators.required],
      provincia: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required],
      contacto: ['', Validators.required],
    });
  }

  onSubmit() {
    this.proveedor = this.saveProveedor();
    this.proveedorService.putProveedor(this.proveedor, this.id)
      .subscribe(newpres => {
        this.router.navigate(['/proveedores'])
      });
  }

  saveProveedor() {
    const saveProveedor = {
      nombre: this.proveedorForm.get('nombre').value,
      cif: this.proveedorForm.get('cif').value,
      direccion: this.proveedorForm.get('direccion').value,
      cp: this.proveedorForm.get('cp').value,
      localidad: this.proveedorForm.get('localidad').value,
      provincia: this.proveedorForm.get('provincia').value,
      telefono: this.proveedorForm.get('telefono').value,
      email: this.proveedorForm.get('email').value,
      contacto: this.proveedorForm.get('contacto').value
    };
    return saveProveedor;
  }

}
