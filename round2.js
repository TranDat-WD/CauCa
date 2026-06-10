const canvas = document.getElementById("sea");
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
const ctx = canvas.getContext("2d");

canvas.width = screenWidth * 2;
canvas.height = screenHeight - 100;

// Functions

let mouseX = 0;
let mouseY = 0;

function animation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fisher1.ve();
  fisher2.ve();
  for (let i = 0; i < fishList.length; i++) {
    if (fishList[i] != catchedFish) {
      fishList[i].capNhatViTri();
      fishList[i].ve();
    } else if (fishList[i] == catchedFish) {
      fishList[i].ve();
    }
  }

  requestAnimationFrame(animation);
}

function getMousePosition(event) {
  let rect = canvas.getBoundingClientRect();
  mouseX = event.clientX - rect.left;
  mouseY = event.clientY - rect.top;
}

function checkCatched(fish) {
  if (
    mouseX > fish.x &&
    mouseX < fish.x + fish.size &&
    mouseY > fish.y &&
    mouseY < fish.y + fish.size
  ) {
    return true;
  } else {
    return false;
  }
}

//Class

class fish {
  constructor(x, y, size, speed, says) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.vx = speed;
    this.say = says;
    // this.vy = Math.random() * (1 - 0.25) + 0.25;
    this.vy = 0;

    this.hinhAnh = new Image();
    this.hinhAnh.src = "src/img/round2/Fish.png";
    this.hinhAnhDaLoad = false;

    this.hinhAnh1 = new Image();
    this.hinhAnh1.src = "src/img/round2/Fish_fliped.png";

    this.hinhAnh.onload = () => {
      this.hinhAnhDaLoad = true;
    };
  }

  capNhatViTri() {
    if (this.y > canvas.height - 350) {
      this.x = this.x + this.vx;
      this.y = this.y + this.vy;

      // Kiểm tra va chạm biên
      if (this.x < 0 || this.x + this.size > canvas.width) {
        this.vx = -this.vx;
      }
      if (this.y < 0 || this.y + this.size > canvas.height) {
        this.vy = -this.vy;
      }
    }
  }

  veRoundRect() {
    ctx.strokeStyle = "rgb(16, 33, 53)";
    ctx.beginPath();
    ctx.roundRect(
      this.x + this.size + 10,
      this.y,
      this.size * 5.5,
      this.size,
      15,
    );
    ctx.stroke();
  }

  veBackground() {
    ctx.beginPath();
    ctx.fillStyle = "rgb(80, 104, 133)";
    ctx.roundRect(
      this.x + this.size + 10,
      this.y,
      this.size * 5.5,
      this.size,
      15,
    );
    ctx.fill();
  }

  veText() {
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.font = "20px serif";
    let line = 1;
    for (let i of this.say) {
      ctx.fillText(
        String(i),
        this.x + this.size + 20,
        this.y + 20 * line,
        this.size * 5,
      );
      line++;
    }
  }

  ve() {
    if (this.hinhAnhDaLoad) {
      if (this.vx > 0) {
        ctx.drawImage(this.hinhAnh1, this.x, this.y, this.size, this.size);
      } else {
        ctx.drawImage(this.hinhAnh, this.x, this.y, this.size, this.size);
      }
      this.veBackground();
      this.veRoundRect();
      this.veText();
    }
  }
}

class monkey {
  constructor(x, y, says) {
    this.x = x;
    this.y = y;
    this.size = 200;
    this.say = says;

    this.hinhAnh = new Image();
    this.hinhAnh.src = "src/img/round2/Fisher.png";
    this.hinhAnhDaLoad = false;

    this.hinhAnh1 = new Image();
    this.hinhAnh1.src = "src/img/round2/Fisher 1.png";

    this.hinhAnh.onload = () => {
      this.hinhAnhDaLoad = true;
    };
  }

  veRoundRect() {
    ctx.strokeStyle = "rgb(0, 0, 0)";
    ctx.beginPath();
    ctx.roundRect(
      this.x - this.size + 150,
      this.y - 45,
      this.size * 1.5,
      this.size * 0.25,
      15,
    );
    ctx.stroke();
  }

  veBackground() {
    ctx.beginPath();
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.roundRect(
      this.x - this.size + 150,
      this.y - 45,
      this.size * 1.5,
      this.size * 0.25,
      15,
    );
    ctx.fill();
  }

  veText() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.font = "20px serif";
    if (Array.isArray(this.say)) {
      for (let i = 0; i < this.say.length; i++) {
        ctx.fillText(
          this.say[i],
          this.x - this.size + 160,
          this.y - 20,
          this.size * 5,
        );
      }
    }
  }

  ve() {
    if (this.hinhAnhDaLoad) {
      if (this.x == 1975) {
        ctx.drawImage(this.hinhAnh, this.x, this.y, this.size, this.size);
      } else {
        ctx.drawImage(this.hinhAnh1, this.x, this.y, this.size, this.size);
      }
      this.veBackground();
      this.veRoundRect();
      this.veText();
    }
  }
}

// Tạo danh sách cá
const dapAn = [
  ["Tứ giác ABCD có các cạnh đối AB và DC,", "AD và BC song song với nhau"],
  ["Tứ giác ABCD có các cạnh đối AB và DC,", "AD và BC bằng nhau"],
  ["Hình thang ABCD có 2 góc kề", "một đáy A và B bằng nhau"],
  ["Hình thang ABCD có 2 góc kề", "một đáy C và D bằng nhau"],
  ["Tứ giác ABCD có một cặp cạnh đối", "AB và DC song song và bằng nhau"],
  ["Tứ giác ABCD có một cặp cạnh đối", "AD và BC song song và bằng nhau"],
  ["Tứ giác ABCD có các góc đối A và C,", "B và D bằng nhau"],
  ["Hình thang ABCD có 2 góc kề", "một đáy A và D bằng nhau"],
  ["Hình thang ABCD có 2 góc kề", "một đáy B và C bằng nhau"],
  ["Tứ giác ABCD có 2 cạnh kề", "AB và AD bằng nhau"],
  ["Tứ giác ABCD có 2 góc kề", "một cạnh bên B và C bằng nhau"],
  ["Tứ giác ABCD có 2 đường chéo", "AC và BD bằng nhau"],
];

// Events

let catchedFish;
const fishList = [];

let fisher1 = new monkey(800 * 2, 125, ["Vì sao ABCD là hình bình hành?"]);
let fisher2 = new monkey(1975, 50, ["Vì sao ABCD là hình thang cân?"]);

animation();
getMousePosition(canvas);

for (let i of fishList) {
  i.ve();
}

for (let i = 0; i < 12; i++) {
  fishList.push(
    new fish(
      Math.random() * (canvas.width - 50),
      250 + Math.random() * (canvas.height - 300),
      50,
      Math.random() * (1.5 - 0.5) + 0.5,
      dapAn[i],
    ),
  );
}

window.addEventListener("resize", () => {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  canvas.width = screenWidth * 2;
  canvas.height = screenHeight - 100;
});

canvas.addEventListener("mousedown", (event) => {
  const mousePos = getMousePosition(event);
  for (let i of fishList) {
    if (checkCatched(i) == true) {
      catchedFish = i;
      console.log(catchedFish.say);
    }
  }
});

canvas.addEventListener("mousemove", () => {
  if (catchedFish != null) {
    catchedFish.x = mouseX - catchedFish.size * 0.5;
    catchedFish.y = mouseY - catchedFish.size * 0.5;
    console.log(mouseX + " - " + mouseY);
    console.log(catchedFish.x + " - " + catchedFish.y);
    catchedFish.ve();
    catchedFish.veBackground();
    catchedFish.veText();
  }
});

canvas.addEventListener("mousemove", (e) => {
  getMousePosition(e);
});

canvas.addEventListener("mouseup", () => {
  if (catchedFish != null) {
    catchedFish = null;
  }
});
