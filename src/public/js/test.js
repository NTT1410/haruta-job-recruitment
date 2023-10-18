<script>
			handleFileUpload = async () => {
				const file = document.getElementById("file");
				console.log(file.files[0]);
				const uploadData = new FormData();
				uploadData.append("user_id", "6527d113636dc2d0e067e4e3");
				uploadData.append("file", file.files[0], "file");
				await fetch("http://localhost:3000/api/candidates/cv", {
					method: "POST",
					body: uploadData, // Payload is formData object
				})
					.then((data) => console.log(data))
					.catch((err) => console.log(err));
			};
		</script>