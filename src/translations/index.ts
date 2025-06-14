export const translations = {
    en: {
        home: {
            welcome: "Welcome to Ktel Attikis",
            heroText: "Experience comfortable and reliable bus transportation services across Greece. Book your journey with us and travel with confidence.",
            bookJourney: "Book Your Journey",
            exploreRoutes: "Explore Our Routes",
            features: {
                modernFleet: {
                    title: "Modern Fleet",
                    description: "Travel in comfort with our modern, well-maintained buses."
                },
                easyBooking: {
                    title: "Easy Booking",
                    description: "Book your tickets online with our simple and secure booking system."
                },
                extensiveRoutes: {
                    title: "Extensive Routes",
                    description: "Connect to major cities and popular destinations across Greece."
                },
                safeTravel: {
                    title: "Safe Travel",
                    description: "Your safety is our priority with professional drivers and regular maintenance."
                }
            },
            whyChooseUs: {
                title: "Why Choose Ktel Attikis?",
                paragraph1: "At Ktel Attikis, we pride ourselves on providing reliable and comfortable bus transportation services. Our modern fleet of buses is regularly maintained to ensure your safety and comfort throughout your journey.",
                paragraph2: "With extensive routes connecting major cities and popular destinations across Greece, we make it easy for you to explore this beautiful country. Our professional drivers are experienced and committed to providing a smooth and enjoyable travel experience.",
                paragraph3: "Book your tickets online through our user-friendly platform, and enjoy the convenience of secure payments and instant confirmation. We're here to make your journey memorable and hassle-free."
            },
            readyToTravel: {
                title: "Ready to Travel?",
                description: "Book your tickets now and enjoy our comfortable bus services.",
                button: "Book Now"
            },
            slideshow: {
                mylopotamos: {
                    title: "Mylopotamos Beach",
                    description: "Crystal clear waters and golden sands"
                },
                thessaloniki: {
                    title: "Thessaloniki",
                    description: "The cultural capital of Northern Greece"
                },
                mykonos: {
                    title: "Mykonos",
                    description: "Ancient history meets modern city life"
                },
                santorini: {
                    title: "Santorini",
                    description: "Breathtaking views of the Aegean Sea"
                }
            }
        },
        routes: {
            title: "Available Routes",
            gridHeaders: {
                time: "Time",
                bus: "Bus",
                destination: "Destination",
                price: "Price"
            },
            busTypes: {
                express: "Express",
                standard: "Standard"
            },
            destinations: {
                athens: "Athens Central",
                thessaloniki: "Thessaloniki",
                patras: "Patras",
                heraklion: "Heraklion",
                ioannina: "Ioannina",
                kalamata: "Kalamata"
            }
        },
        tickets: {
            title: "Book Your Tickets",
            loading: "Loading routes...",
            selectRoute: "Select a route",
            oneWay: "One-Way",
            roundTrip: "Round Trip",
            departureDate: "Departure Date",
            confirm: "Confirm",
            errors: {
                noRoute: "Please select a route before confirming!",
                noDate: "Please select a date before confirming!",
                load: "Failed to load routes. Please try again later."
            }
        },
        seats: {
            title: "Select Your Seat",
            loading: "Loading...",
            routeNotFound: "Route not found",
            routeNotFoundMessage: "The selected route could not be found. Please go back and try again.",
            routeInfo: {
                departure: "Departure:",
                return: "Return:"
            },
            selectSeat: {
                title: "Select a Seat",
                message: "Click on an available seat to book it"
            },
            passengerDetails: {
                title: "Passenger Details",
                fullName: "Full Name",
                passportNumber: "Passport Number",
                ticketTypes: {
                    adult: "Adult - 20 €",
                    student: "Student - 13 €",
                    child: "Child - 10 €"
                },
                addToCart: "Add to Cart"
            },
            errors: {
                loadRoute: "Failed to load route details. Please try again later."
            }
        },
        contact: {
            title: "Visit Our Station",
            location: {
                title: "Main Station Location",
                address1: "123 Station Liosia",
                address2: "Dexamenis 21, Attiki"
            },
            hours: {
                title: "Station Hours",
                weekday: "Monday - Friday: 8:00 AM - 8:00 PM",
                saturday: "Saturday: 9:00 AM - 5:00 PM",
                sunday: "Sunday: Closed"
            },
            facilities: {
                title: "Station Facilities & Services",
                ticketCollection: {
                    title: "Ticket Collection",
                    description: "Collect your pre-booked tickets from our ticket office or self-service kiosks",
                    items: [
                        "Bring your booking reference",
                        "Valid ID required",
                        "Print at home option available"
                    ]
                },
                wifi: {
                    title: "Free WiFi",
                    description: "Stay connected with our complimentary high-speed WiFi",
                    items: [
                        "Available throughout the station",
                        "No time limit",
                        "Secure connection"
                    ]
                },
                parking: {
                    title: "Parking",
                    description: "Secure parking facilities for all passengers",
                    items: [
                        "24/7 surveillance",
                        "Short and long-term options",
                        "Disabled parking available"
                    ]
                },
                refreshments: {
                    title: "Refreshments",
                    description: "Various dining options available",
                    items: [
                        "Café and restaurant",
                        "Snack kiosks",
                        "Vending machines"
                    ]
                },
                accessibility: {
                    title: "Accessibility",
                    description: "Fully accessible facilities for all passengers",
                    items: [
                        "Wheelchair ramps",
                        "Accessible restrooms",
                        "Priority boarding"
                    ]
                },
                store: {
                    title: "Convenience Store",
                    description: "Travel essentials and last-minute items",
                    items: [
                        "Travel accessories",
                        "Snacks and drinks",
                        "Basic necessities"
                    ]
                }
            }
        },
        footer: {
            commentBox: {
                title: "Leave a Comment",
                name: "Name:",
                email: "Email:",
                comment: "Comment:",
                submit: "Submit",
                success: "Thank you for your comment!",
                error: "Failed to send message. Please try again."
            },
            contactInfo: {
                title: "Contact Us",
                address1: "123 Station Liosia",
                address2: "Dexamenis 21, Attiki",
                telephone: "Telephone: (555) 555-1234",
                email: "Email: info@mywebsite.com"
            }
        },
        bookings: {
            title: "My Bookings",
            loading: "Loading your bookings...",
            noBookings: "You don't have any bookings yet.",
            outboundJourney: "Outbound Journey",
            returnJourney: "Return Journey",
            seat: "Seat",
            totalPrice: "Total Price",
            requestRefund: "Request Refund",
            refund: {
                success: "Refund requested successfully! Booking has been cancelled.",
                error: "Failed to process refund request."
            },
            status: {
                active: "Active",
                completed: "Completed",
                cancelled: "Cancelled",
                refunded: "Refunded"
            },
            refundStatus: {
                pending: "Refund Pending",
                approved: "Refund Approved",
                rejected: "Refund Rejected"
            },
            errors: {
                load: "Failed to load bookings. Please try again later."
            }
        },
        cart: {
            title: "Your Cart",
            empty: "Your cart is empty",
            total: "Total",
            checkout: "Checkout",
            remove: "Remove",
            passenger: {
                name: "Passenger",
                seat: "Seat",
                price: "Price"
            },
            passport: {
                title: "Enter Passport Number",
                placeholder: "Passport Number",
                submit: "Submit",
                error: "Please enter a valid passport number"
            },
            ticket: {
                removed: "Ticket removed from cart",
                purchaseSuccess: "Ticket purchased successfully!"
            },
            errors: {
                purchase: "Failed to create bookings. Please try again.",
                serverError: "Server error",
                noResponse: "No response from server. Please check your connection.",
                requestError: "Request error"
            }
        },
        auth: {
            login: "Sign In",
            register: "Sign Up",
            logout: "Sign Out",
            welcome: "Welcome",
            myBookings: "My Bookings",
            loginSuccess: "Successfully signed in!",
            logoutSuccess: "Successfully signed out!",
            registerSuccess: "Successfully registered!",
            errors: {
                login: "Failed to sign in. Please try again.",
                register: "Failed to register. Please try again.",
                logout: "Failed to sign out. Please try again.",
                required: "Please fill in all required fields",
                invalidEmail: "Please enter a valid email address",
                passwordMismatch: "Passwords do not match",
                passwordLength: "Password must be at least 6 characters long"
            }
        },
        payment: {
            summary: "Payment Summary",
            total: "Total",
            cardDetails: "Card Details",
            cancel: "Cancel",
            pay: "Pay",
            processing: "Processing...",
            success: "Payment successful! Your tickets have been booked.",
            error: "Payment failed. Please try again."
        }
    },
    el: {
        home: {
            welcome: "Καλώς ήρθατε στην Κτελ Αττικής",
            heroText: "Νιώστε την άνεση και την αξιοπιστία των υπηρεσιών μεταφοράς λεωφορείων σε όλη την Ελλάδα. Κρατήστε το ταξίδι σας μαζί μας και ταξιδέψτε με αυτοπεποίθηση.",
            bookJourney: "Κράτηση Ταξιδιού",
            exploreRoutes: "Εξερευνήστε τις Διαδρομές μας",
            features: {
                modernFleet: {
                    title: "Σύγχρονος Στόλος",
                    description: "Ταξιδέψτε με άνεση με τα σύγχρονα, καλά συντηρημένα λεωφορεία μας."
                },
                easyBooking: {
                    title: "Εύκολη Κράτηση",
                    description: "Κρατήστε τα εισιτήριά σας online με το απλό και ασφαλές σύστημα κρατήσεών μας."
                },
                extensiveRoutes: {
                    title: "Πολλές Διαδρομές",
                    description: "Συνδεθείτε με τις μεγάλες πόλεις και τους δημοφιλείς προορισμούς σε όλη την Ελλάδα."
                },
                safeTravel: {
                    title: "Ασφαλές Ταξίδι",
                    description: "Η ασφάλειά σας είναι η προτεραιότητά μας με επαγγελματίες οδηγούς και τακτική συντήρηση."
                }
            },
            whyChooseUs: {
                title: "Γιατί να επιλέξετε την Κτελ Αττικής;",
                paragraph1: "Στην Κτελ Αττικής, υπερηφανευόμαστε για την παροχή αξιόπιστων και άνετων υπηρεσιών μεταφοράς λεωφορείων. Ο σύγχρονος στόλος των λεωφορείων μας συντηρείται τακτικά για να εξασφαλίσει την ασφάλεια και την άνεσή σας κατά τη διάρκεια του ταξιδιού σας.",
                paragraph2: "Με εκτεταμένες διαδρομές που συνδέουν τις μεγάλες πόλεις και τους δημοφιλείς προορισμούς σε όλη την Ελλάδα, κάνουμε εύκολη την εξερεύνηση αυτής της όμορφης χώρας. Οι επαγγελματίες οδηγοί μας είναι έμπειροι και αφοσιωμένοι στην παροχή μιας ομαλής και ευχάριστης εμπειρίας ταξιδιού.",
                paragraph3: "Κρατήστε τα εισιτήριά σας online μέσω της φιλικής προς το χρήστη πλατφόρμας μας και απολαύστε την ευκολία των ασφαλών πληρωμών και της άμεσης επιβεβαίωσης. Είμαστε εδώ για να κάνουμε το ταξίδι σας αξέχαστο και χωρίς προβλήματα."
            },
            readyToTravel: {
                title: "Είστε έτοιμοι να ταξιδέψετε;",
                description: "Κρατήστε τα εισιτήριά σας τώρα και απολαύστε τις άνετες υπηρεσίες λεωφορείων μας.",
                button: "Κράτηση Τώρα"
            },
            slideshow: {
                mylopotamos: {
                    title: "Παραλία Μυλοποτάμου",
                    description: "Κρυστάλλινα νερά και χρυσή άμμος"
                },
                thessaloniki: {
                    title: "Θεσσαλονίκη",
                    description: "Η πολιτιστική πρωτεύουσα της Βόρειας Ελλάδας"
                },
                mykonos: {
                    title: "Μύκονος",
                    description: "Η αρχαία ιστορία συναντά τη σύγχρονη ζωή"
                },
                santorini: {
                    title: "Σαντορίνη",
                    description: "Εντυπωσιακές θέας του Αιγαίου"
                }
            }
        },
        routes: {
            title: "Διαθέσιμες Διαδρομές",
            gridHeaders: {
                time: "Ώρα",
                bus: "Λεωφορείο",
                destination: "Προορισμός",
                price: "Τιμή"
            },
            busTypes: {
                express: "Εξπρές",
                standard: "Κανονικό"
            },
            destinations: {
                athens: "Αθήνα Κέντρο",
                thessaloniki: "Θεσσαλονίκη",
                patras: "Πάτρα",
                heraklion: "Ηράκλειο",
                ioannina: "Ιωάννινα",
                kalamata: "Καλαμάτα"
            }
        },
        tickets: {
            title: "Κράτηση Εισιτηρίων",
            loading: "Φόρτωση διαδρομών...",
            selectRoute: "Επιλέξτε διαδρομή",
            oneWay: "Μονόδρομο",
            roundTrip: "Επιστροφή",
            departureDate: "Ημερομηνία Αναχώρησης",
            confirm: "Επιβεβαίωση",
            errors: {
                noRoute: "Παρακαλώ επιλέξτε διαδρομή πριν την επιβεβαίωση!",
                noDate: "Παρακαλώ επιλέξτε ημερομηνία πριν την επιβεβαίωση!",
                load: "Αποτυχία φόρτωσης διαδρομών. Παρακαλώ δοκιμάστε ξανά αργότερα."
            }
        },
        seats: {
            title: "Επιλέξτε την Θέση σας",
            loading: "Φόρτωση...",
            routeNotFound: "Η διαδρομή δεν βρέθηκε",
            routeNotFoundMessage: "Η επιλεγμένη διαδρομή δεν μπόρεσε να βρεθεί. Παρακαλώ επιστρέψτε και δοκιμάστε ξανά.",
            routeInfo: {
                departure: "Αναχώρηση:",
                return: "Επιστροφή:"
            },
            selectSeat: {
                title: "Επιλέξτε Θέση",
                message: "Κάντε κλικ σε μια διαθέσιμη θέση για να την κρατήσετε"
            },
            passengerDetails: {
                title: "Στοιχεία Επιβάτη",
                fullName: "Ονοματεπώνυμο",
                passportNumber: "Αριθμός Διαβατηρίου",
                ticketTypes: {
                    adult: "Ενήλικας - 20 €",
                    student: "Φοιτητής - 13 €",
                    child: "Παιδί - 10 €"
                },
                addToCart: "Προσθήκη στο Καλάθι"
            },
            errors: {
                loadRoute: "Αποτυχία φόρτωσης λεπτομερειών διαδρομής. Παρακαλώ δοκιμάστε ξανά αργότερα."
            }
        },
        contact: {
            title: "Επισκεφθείτε τον Σταθμό μας",
            location: {
                title: "Κύρια Τοποθεσία Σταθμού",
                address1: "123 Σταθμός Λιοσίων",
                address2: "Δεξαμενής 21, Αττική"
            },
            hours: {
                title: "Ωράριο Σταθμού",
                weekday: "Δευτέρα - Παρασκευή: 8:00 π.μ. - 8:00 μ.μ.",
                saturday: "Σάββατο: 9:00 π.μ. - 5:00 μ.μ.",
                sunday: "Κυριακή: Κλειστά"
            },
            facilities: {
                title: "Εγκαταστάσεις & Υπηρεσίες Σταθμού",
                ticketCollection: {
                    title: "Λήψη Εισιτηρίων",
                    description: "Πάρτε τα προ-κρατημένα εισιτήριά σας από το ταμείο εισιτηρίων ή τους αυτοεξυπηρετούμενους σταθμούς",
                    items: [
                        "Φέρτε τον κωδικό κράτησής σας",
                        "Απαιτείται έγκυρο ταυτοποιητικό",
                        "Διαθέσιμη επιλογή εκτύπωσης στο σπίτι"
                    ]
                },
                wifi: {
                    title: "Δωρεάν WiFi",
                    description: "Μείνετε συνδεδεμένοι με το δωρεάν υψηλής ταχύτητας WiFi μας",
                    items: [
                        "Διαθέσιμο σε όλο τον σταθμό",
                        "Χωρίς χρονικό όριο",
                        "Ασφαλής σύνδεση"
                    ]
                },
                parking: {
                    title: "Στάθμευση",
                    description: "Ασφαλείς εγκαταστάσεις στάθμευσης για όλους τους επιβάτες",
                    items: [
                        "Παρακολούθηση 24/7",
                        "Επιλογές βραχείας και μακράς διάρκειας",
                        "Διαθέσιμη στάθμευση για ΑΜΕΑ"
                    ]
                },
                refreshments: {
                    title: "Αναψυκτικά",
                    description: "Διάφορες επιλογές εστίασης",
                    items: [
                        "Καφέ και εστιατόριο",
                        "Περίπτερα σνακ",
                        "Αυτόματοι πωλητές"
                    ]
                },
                accessibility: {
                    title: "Προσβασιμότητα",
                    description: "Πλήρως προσβάσιμες εγκαταστάσεις για όλους τους επιβάτες",
                    items: [
                        "Ράμπες για αναπηρικά αμαξίδια",
                        "Προσβάσιμες τουαλέτες",
                        "Προτεραιότητα επιβίβασης"
                    ]
                },
                store: {
                    title: "Παντοπωλείο",
                    description: "Απαραίτητα ταξιδιού και τελευταίας στιγμής",
                    items: [
                        "Αξεσουάρ ταξιδιού",
                        "Σνακ και αναψυκτικά",
                        "Βασικά απαραίτητα"
                    ]
                }
            }
        },
        footer: {
            commentBox: {
                title: "Αφήστε ένα Σχόλιο",
                name: "Όνομα:",
                email: "Email:",
                comment: "Σχόλιο:",
                submit: "Υποβολή",
                success: "Ευχαριστούμε για το σχόλιό σας!",
                error: "Αποτυχία αποστολής μηνύματος. Παρακαλώ δοκιμάστε ξανά."
            },
            contactInfo: {
                title: "Επικοινωνήστε μαζί μας",
                address1: "123 Σταθμός Λιοσίων",
                address2: "Δεξαμενής 21, Αττική",
                telephone: "Τηλέφωνο: (555) 555-1234",
                email: "Email: info@mywebsite.com"
            }
        },
        bookings: {
            title: "Οι Κρατήσεις μου",
            loading: "Φόρτωση των κρατήσεών σας...",
            noBookings: "Δεν έχετε κρατήσεις ακόμα.",
            outboundJourney: "Ταξίδι Εξερχόμενο",
            returnJourney: "Ταξίδι Επιστροφής",
            seat: "Θέση",
            totalPrice: "Συνολική Τιμή",
            requestRefund: "Αίτηση Επιστροφής",
            refund: {
                success: "Η επιστροφή χρημάτων ζητήθηκε με επιτυχία! Η κράτηση ακυρώθηκε.",
                error: "Αποτυχία επεξεργασίας αιτήματος επιστροφής χρημάτων."
            },
            status: {
                active: "Ενεργή",
                completed: "Ολοκληρωμένη",
                cancelled: "Ακυρωμένη",
                refunded: "Επιστροφή Χρημάτων"
            },
            refundStatus: {
                pending: "Επιστροφή σε Εκκρεμότητα",
                approved: "Επιστροφή Εγκεκριμένη",
                rejected: "Επιστροφή Απορρίφθηκε"
            },
            errors: {
                load: "Αποτυχία φόρτωσης κρατήσεων. Παρακαλώ δοκιμάστε ξανά αργότερα."
            }
        },
        cart: {
            title: "Το Καλάθι σας",
            empty: "Το καλάθι σας είναι άδειο",
            total: "Σύνολο",
            checkout: "Ολοκλήρωση",
            remove: "Αφαίρεση",
            passenger: {
                name: "Επιβάτης",
                seat: "Θέση",
                price: "Τιμή"
            },
            passport: {
                title: "Εισάγετε Αριθμό Διαβατηρίου",
                placeholder: "Αριθμός Διαβατηρίου",
                submit: "Υποβολή",
                error: "Παρακαλώ εισάγετε έγκυρο αριθμό διαβατηρίου"
            },
            ticket: {
                removed: "Το εισιτήριο αφαιρέθηκε από το καλάθι",
                purchaseSuccess: "Το εισιτήριο αγοράστηκε με επιτυχία!"
            },
            errors: {
                purchase: "Αποτυχία δημιουργίας κρατήσεων. Παρακαλώ δοκιμάστε ξανά.",
                serverError: "Σφάλμα διακομιστή",
                noResponse: "Δεν υπάρχει απάντηση από τον διακομιστή. Παρακαλώ ελέγξτε τη σύνδεσή σας.",
                requestError: "Σφάλμα αιτήματος"
            }
        },
        auth: {
            login: "Είσοδος",
            register: "Εγγραφή",
            logout: "Έξοδος",
            welcome: "Καλώς ήρθατε",
            myBookings: "Οι Κρατήσεις μου",
            loginSuccess: "Εισήλθατε με επιτυχία!",
            logoutSuccess: "Εξήλθατε με επιτυχία!",
            registerSuccess: "Εγγραφήκατε με επιτυχία!",
            errors: {
                login: "Αποτυχία εισόδου. Παρακαλώ δοκιμάστε ξανά.",
                register: "Αποτυχία εγγραφής. Παρακαλώ δοκιμάστε ξανά.",
                logout: "Αποτυχία εξόδου. Παρακαλώ δοκιμάστε ξανά.",
                required: "Παρακαλώ συμπληρώστε όλα τα απαιτούμενα πεδία",
                invalidEmail: "Παρακαλώ εισάγετε έγκυρη διεύθυνση email",
                passwordMismatch: "Οι κωδικοί πρόσβασης δεν ταιριάζουν",
                passwordLength: "Ο κωδικός πρόσβασης πρέπει να έχει τουλάχιστον 6 χαρακτήρες"
            }
        },
        payment: {
            summary: "Περίληψη Πληρωμής",
            total: "Σύνολο",
            cardDetails: "Στοιχεία Κάρτας",
            cancel: "Ακύρωση",
            pay: "Πληρωμή",
            processing: "Επεξεργασία...",
            success: "Επιτυχής πληρωμή! Τα εισιτήριά σας έχουν κρατηθεί.",
            error: "Η πληρωμή απέτυχε. Παρακαλώ δοκιμάστε ξανά."
        }
    }
}; 
