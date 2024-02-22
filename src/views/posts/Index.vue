<template>
    <div class="container mt-custom">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>DATA POST</h4>
                        <hr>
                        <router-link :to="{ name: 'posts.create' }" class="btn btn-md btn-success">TAMBAH POST</router-link>

                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">NIS</th>
                                    <th scope="col">Nama</th>
                                    <th scope="col">Jenis Kelamin</th>
                                    <th scope="col">Tempat Lahir</th>
                                    <th scope="col">Tanggal Lahir</th>
                                    <th scope="col">No HP</th>
                                    <th scope="col">Alamat</th>
                                    <th scope="col">Nama Orang Tua</th>
                                    <th scope="col">Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(siswa, index) in siswaList" :key="siswa.id">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ siswa.nis }}</td>
                                    <td>{{ siswa.nama }}</td>
                                    <td>{{ siswa.jenis_kelamin }}</td>
                                    <td>{{ siswa.tempat_lahir }}</td>
                                    <td>{{ formatDate(siswa.tanggal_lahir) }}</td>
                                    <td>{{ siswa.no_hp }}</td>
                                    <td>{{ siswa.alamat }}</td>
                                    <td>{{ siswa.nama_ortu }}</td>
                                    <td class="text-center">
                                        <router-link :to="{ name: 'posts.edit', params: { id: siswa.id } }" class="btn btn-sm btn-primary me-2">EDIT</router-link>
                                        <button @click.prevent="postDelete(siswa.id)" class="btn btn-sm btn-danger ml-1">DELETE</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'IndexPosts',
    data() {
        return {
            siswaList: [],
        }
    },
    methods: {
        postDelete(id) {
            axios.delete(`http://127.0.0.1:3000/delete/${id}`)
                .then(response => {
                    console.log('Berhasil menghapus siswa dengan id', id ,response);
                    // reload
                    location.reload()
                })
                .catch(error => {
                    console.error('Gagal menghapus siswa:', error);
                });
        },
        setSiswaList(data) {
            this.siswaList = data;
        },
        formatDate(value) {
            const date = new Date(value);
            return date.toLocaleDateString('id-ID'); // Sesuaikan dengan preferensi format tanggal Anda
        }
    },
   
    mounted() {
        axios.get('http://127.0.0.1:3000/tampil')
            .then((response) => this.setSiswaList(response.data.data))

            .catch((error) => console.log("gagal", error))
    }
}
</script>
