<?php

session_start();

$user = $_SESSION['user'];

if($user == 'admin') {
    echo '{
        "message": "Admin page for logged in users",
        "success": true
    }';
} else {
    echo '{
        "messgae": "Logged out but logged in?",
        "success": false
    }';
}

?>