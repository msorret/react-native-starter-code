import { Text, View, StyleSheet, Image } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function TriviaComponent() {

    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState('');


    const fetchTriviaQuestion = async () => {
        try {
            const response = await axios.get('https://opentdb.com/api.php?amount=1&category=18');
            const data = response.data.results[0];

            if (data.type !== 'multiple') {
                return fetchTriviaQuestion();
            }

            setQuestion(data.question);
            setOptions([...data.incorrect_answers, data.correct_answer]);
            setCorrectAnswer(data.correct_answer);
        } catch (error) {
            console.error('Error fetching trivia question:', error);
        }
    };

    useEffect(() => {
        fetchTriviaQuestion();
    }, []);

    const handleAnswer = (selectedAnswer) => {
        if (selectedAnswer === correctAnswer) {
            Alert.alert('Correct!', 'Great job!');
        } else {
            Alert.alert('Incorrect', 'Try again!');
        }
    };

    return (

    <View style={styles.container}>
    <Text style={styles.question}>{question}</Text>
    <Button title={option[0]} onPress={() => handleAnswer(option[0])}/>
    <Button  title={option[1]} onPress={() => handleAnswer(option[1])}/>
    <Button  title={option[2]} onPress={() => handleAnswer(option[2])}/>
    <Button title={option[3]} onPress={() => handleAnswer(option[3])}/>
    </View>
    
    );
}

const styles = StyleSheet.create({

});
